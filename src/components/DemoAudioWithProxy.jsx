// src/components/DemoAudioWithProxy.jsx
import React, { useEffect, useState } from "react";

export default function DemoAudioWithProxy({ url }) {
  const [src, setSrc] = useState(url || "");
  const [status, setStatus] = useState("idle"); // idle|error|proxying|playing
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setSrc(url || "");
    setStatus("idle");
    setMsg("");
    return () => {
      // revoke object URLs when component unmounts or src changes
      if (src && src.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(src);
        } catch (err) {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const handleError = async (e) => {
    console.warn("Direct audio failed:", url, e);
    setStatus("proxying");
    setMsg("Trying proxy fetch…");

    try {
      // WARNING: public proxies are for testing only (rate limits/security)
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const resp = await fetch(proxyUrl);
      if (!resp.ok) throw new Error(`Proxy fetch failed ${resp.status}`);
      const blob = await resp.blob();
      const objectUrl = URL.createObjectURL(blob);
      setSrc(objectUrl);
      setStatus("playing");
      setMsg("");
    } catch (err) {
      console.error("Proxy fetch failed:", err);
      setStatus("error");
      setMsg("Proxy fetch failed — likely blocked or proxy limit reached.");
    }
  };

  if (!url) return <p className="text-gray-500 italic">No audio</p>;

  if (status === "error") {
    return (
      <div>
        <p className="text-red-400 mt-2">⚠️ Audio not available (CORS/permissions).</p>
        <p className="text-sm text-gray-400 mt-1">{msg}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm underline">
          Open/Download
        </a>
      </div>
    );
  }

  return (
    <>
      <audio controls className="w-full mt-2" onError={handleError}>
        <source src={src} />
        Your browser does not support the audio element.
      </audio>

      {status === "proxying" && <p className="text-sm text-gray-400 mt-1">{msg}</p>}

      <div className="mt-2">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm underline">
          Open/Download
        </a>
      </div>
    </>
  );
}
