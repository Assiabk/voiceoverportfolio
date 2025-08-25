// src/pages/about.js
import React from "react";
import { motion } from "framer-motion";
import Logo from "../logo_voiceover.jpg";
export default function AboutSection() {
  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-b from-black via-[#0f0f0f] to-black text-white"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left side image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex-shrink-0"
        >
          <img
            src={Logo} 
            alt="Voice Artist"
            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-xl border-4 border-purple-500/30"
          />
        </motion.div>

        {/* Right side text */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            I’m a passionate <span className="text-purple-300">Voice Over Artist</span> with a warm,
            expressive, and versatile style. From commercials and e-learning to
            narration and character voices, I bring clarity, tone, and emotion
            into every script.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed mb-6">
            I can perform in <span className="text-purple-300">Arabic, English, French, and Kabyle</span>,
            helping clients reach wider audiences and connect with people across
            different cultures.
          </p>

          {/* Highlight languages */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {["Arabic", "English", "French", "Kabyle"].map((item, i) => (
              <motion.span
                key={i}
                className="px-4 py-2 text-sm rounded-full border border-purple-400/30 bg-white/5"
                whileHover={{ scale: 1.1 }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
