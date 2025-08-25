// src/pages/ServicesSection.js
import React, { useState } from "react";
import { motion } from "framer-motion";

function VideoPlayer({ src, idx }) {
  const [error, setError] = useState(false);

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-purple-400/20 bg-black">
      {!error ? (
        <video
          key={src}
          controls
          preload="metadata"
          className="w-full h-auto max-h-[420px] object-cover"
          playsInline
          onError={() => setError(true)}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="w-full h-56 flex items-center justify-center text-gray-400 p-4">
          Video {idx + 1} not found at <code className="ml-2">{src}</code>
        </div>
      )}
    </div>
  );
}

export default function ServicesSection() {
  // static video filenames (must be in public/videos/)
  const videos = [
    { id: 1, fileName: "video1.mp4" },
    { id: 2, fileName: "video2.mp4" },
  ];

  // audio demos (kept as before)
  const demos = [
    { id: 1, fileName: "1.mp4", title: "Commercial Demo" },
    { id: 2, fileName: "2.mp4", title: "Narration Demo" },
    { id: 4, fileName: "4.mp4", title: "E-learning Demo" },
    { id: 5, fileName: "5.mp4", title: "Character Demo" },
    { id: 6, fileName: "6.mp4", title: "Promo Demo" },
    { id: 7, fileName: "7.mp4", title: "Documentary Demo" },
    { id: 8, fileName: "8.mp4", title: "IVR Demo" },
    { id: 9, fileName: "9.mp4", title: "Trailer Demo" },
  ];

  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.7 } } };

  return (
    <section
      id="services"
      className="relative px-6 py-16 bg-gradient-to-b from-[#0f0f0f] via-black to-[#0f0f0f] text-white"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          My Services & Demos
        </h2>
        <p className="text-gray-400 mt-3">Listen to a selection of my voice-over samples.</p>
      </div>

      {/* Two static videos */}
      <div className="max-w-6xl mx-auto mb-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className="grid gap-6 md:grid-cols-2"
        >
          {videos.map((v, idx) => (
            <VideoPlayer key={v.id} src={`/videos/${v.fileName}`} idx={idx} />
          ))}
        </motion.div>
      </div>

      {/* Demos Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 md:grid-cols-2">
          {demos.map((demo, idx) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/5 border border-purple-400/20 shadow-lg hover:shadow-purple-600/20 transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4 text-purple-300">
                {demo.title ?? `Demo ${demo.id}`}
              </h3>

              <audio controls className="w-full mt-2 rounded-lg overflow-hidden">
                <source src={`/audio/${demo.fileName}`} type="audio/mp4" />
                <source src={`/audio/${demo.fileName}`} type="audio/mpeg" />
                <source src={`/audio/${demo.fileName}`} type="audio/ogg" />
                Your browser does not support the audio element.
              </audio>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
