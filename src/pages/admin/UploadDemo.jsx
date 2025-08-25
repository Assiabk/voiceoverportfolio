// src/pages/admin/UploadDemo.jsx
import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const TARGET_SAMPLE_RATE = 22050; 
const TARGET_CHANNEL_COUNT = 1;
const SIZE_WARNING_BYTES = 900 * 1024;

function audioBufferToWavBlob(buffer) {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1;
  const bitDepth = 16;

  const channelData = buffer.getChannelData(0);
  const bufferLength = channelData.length;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const byteLength = 44 + bufferLength * blockAlign;
  const wav = new ArrayBuffer(byteLength);
  const view = new DataView(wav);

  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + bufferLength * blockAlign, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(view, 36, "data");
  view.setUint32(40, bufferLength * blockAlign, true);

  let offset = 44;
  for (let i = 0; i < bufferLength; i++, offset += 2) {
    let s = Math.max(-1, Math.min(1, channelData[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  return new Blob([view], { type: "audio/wav" });
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

const blobToDataURL = (blob) =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsDataURL(blob);
  });

const fileToArrayBuffer = (file) =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsArrayBuffer(file);
  });

async function resampleToMono(buffer, targetSampleRate) {
  const duration = buffer.duration;
  const offlineCtx =
    typeof OfflineAudioContext !== "undefined"
      ? new OfflineAudioContext(TARGET_CHANNEL_COUNT, Math.ceil(targetSampleRate * duration), targetSampleRate)
      : null;

  if (!offlineCtx) {
    throw new Error("OfflineAudioContext not supported in this browser.");
  }

  const source = offlineCtx.createBufferSource();
  let inputBuffer = buffer;

  if (buffer.numberOfChannels > 1) {
    const len = buffer.length;
    const tmp = offlineCtx.createBuffer(1, len, buffer.sampleRate);
    const output = tmp.getChannelData(0);
    const chCount = buffer.numberOfChannels;
    for (let ch = 0; ch < chCount; ch++) {
      const data = buffer.getChannelData(ch);
      for (let i = 0; i < len; i++) {
        output[i] = (output[i] || 0) + data[i] / chCount;
      }
    }
    inputBuffer = tmp;
  }

  source.buffer = inputBuffer;
  source.connect(offlineCtx.destination);
  source.start(0);

  const rendered = await offlineCtx.startRendering();
  return rendered;
}

export default function UploadDemo() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewInfo, setPreviewInfo] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
    setPreviewInfo(null);
  };

  const compressAndPreview = async () => {
    if (!file) return alert("Choose an audio file first.");
    setLoading(true);
    try {
      const ab = await fileToArrayBuffer(file);
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const decoded = await audioCtx.decodeAudioData(ab.slice(0));
      const rendered = await resampleToMono(decoded, TARGET_SAMPLE_RATE);
      const blob = audioBufferToWavBlob(rendered);
      const dataUrl = await blobToDataURL(blob);
      setPreviewInfo({
        duration: Math.round(rendered.duration * 10) / 10,
        compressedSize: blob.size,
        compressedBase64: dataUrl,
        originalName: file.name,
      });
    } catch (err) {
      console.error("Compression failed:", err);
      alert("Compression failed: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please choose an audio file to upload.");

    if (!previewInfo || !previewInfo.compressedBase64) {
      await compressAndPreview();
    }

    if (!previewInfo || !previewInfo.compressedBase64) {
      return alert("No compressed data available to upload.");
    }

    if (previewInfo.compressedSize > SIZE_WARNING_BYTES) {
      const ok = window.confirm(
        `Compressed file is ${(previewInfo.compressedSize / 1024).toFixed(1)} KB — which is larger than recommended. Continue?`
      );
      if (!ok) return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "demos"), {
        audioBase64: previewInfo.compressedBase64,
        audioFileName: previewInfo.originalName || file.name,
        compressedSizeBytes: previewInfo.compressedSize,
        durationSeconds: previewInfo.duration,
        createdAt: serverTimestamp(),
      });

      setFile(null);
      setPreviewInfo(null);
      alert("Demo uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed! See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <form onSubmit={handleUpload} className="max-w-md w-full bg-white/5 p-6 rounded-xl border border-purple-400/20">
        <h2 className="text-2xl font-bold mb-4 text-purple-300">Upload New Demo</h2>

        <label className="text-sm text-gray-300 mb-1">Upload audio file</label>
        <input type="file" accept="audio/*" onChange={handleFileChange} className="w-full mb-3" />

        <div className="flex gap-2 mb-3">
          <button type="button" onClick={compressAndPreview} disabled={!file || loading} className="flex-1 py-2 bg-gray-700 rounded hover:bg-gray-600">
            {loading ? "Processing..." : "Compress & Preview"}
          </button>
          <button type="submit" disabled={loading} className="flex-1 py-2 bg-purple-500 rounded hover:bg-purple-600 disabled:opacity-50">
            {loading ? "Uploading..." : "Upload Demo"}
          </button>
        </div>

        {previewInfo && (
          <div className="mt-2 p-3 rounded bg-black/40 border border-gray-700 text-sm">
            <div className="font-medium">{previewInfo.originalName}</div>
            <div className="text-gray-300">Duration: {previewInfo.duration}s</div>
            <div className="text-gray-300">Compressed size: {(previewInfo.compressedSize / 1024).toFixed(1)} KB</div>
            {previewInfo.compressedSize > SIZE_WARNING_BYTES && (
              <div className="text-yellow-400 mt-1">
                Warning: compressed file is large — consider trimming or re-recording shorter demo.
              </div>
            )}
            <div className="mt-2">
              <audio controls src={previewInfo.compressedBase64} className="w-full" />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
