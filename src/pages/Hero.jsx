// src/pages/hero.js
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "../logo_voiceover.jpg";

export default function HeroSection() {
  const navigate = useNavigate();

  const svgFallback =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'>
         <rect width='100%' height='100%' fill='#0b0b0b'/>
         <text x='50%' y='50%' fill='#b083ff' font-family='Arial, sans-serif' font-size='120' text-anchor='middle' dominant-baseline='middle'>A</text>
       </svg>`
    );

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2, ease: "easeInOut" } },
    tap: { scale: 0.95 },
  };

  // Robust: if a DOM element with id exists, scroll to it. Otherwise navigate to route.
  const goToIdOrRoute = (id, route) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    // fallback: navigate to route (e.g. /services)
    navigate(route);
  };

  return (
    <section
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden px-6 md:px-12"
      style={{
        background:
          "radial-gradient(1200px 600px at 10% 20%, rgba(171,111,255,0.12), transparent 10%), radial-gradient(1000px 400px at 90% 85%, rgba(255,110,160,0.08), transparent 10%), #000000",
        color: "#F2F2F2",
      }}
    >
      {/* Animated backgrounds & logo (unchanged) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -50, y: -50 }}
        animate={{
          opacity: 0.14,
          scale: 1,
          x: 0,
          y: [-10, 10, -10],
          rotate: [-1, 1, -1],
        }}
        transition={{
          duration: 2,
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute -left-12 -top-12 w-64 h-64 rounded-full blur-3xl"
        style={{ background: "linear-gradient(180deg,#ff9fb7,#b083ff)" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 50, y: 50 }}
        animate={{
          opacity: 0.12,
          scale: 1,
          x: 0,
          y: [-8, 12, -8],
          rotate: [1, -1, 1],
        }}
        transition={{
          duration: 2.5,
          delay: 0.25,
          y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
          rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
        }}
        className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full blur-3xl"
        style={{ background: "linear-gradient(180deg,#b083ff,#ff9fb7)" }}
      />

      <motion.div
        variants={itemVariants}
        className="flex-shrink-0 mb-6 md:mb-0 md:mr-8"
        whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.3 } }}
      >
        <motion.img
          src={Logo}
          alt="Voice Over Logo"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = svgFallback;
          }}
          className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover shadow-lg"
          animate={{
            boxShadow: [
              "0 0 20px rgba(255,159,183,0.3)",
              "0 0 30px rgba(176,131,255,0.4)",
              "0 0 20px rgba(255,159,183,0.3)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="text-center md:text-left max-w-xl">
        <motion.h1 variants={itemVariants} className="text-2xl md:text-3xl font-extrabold leading-tight">
          Hi, I'm{" "}
          <motion.span
            style={{
              background: "linear-gradient(90deg,#ff9fb7,#b083ff)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            Your
          </motion.span>{" "}
          Voice Over
        </motion.h1>

        <motion.p variants={itemVariants} className="mt-2 text-sm md:text-base text-[#F2F2F2]/85">
          Warm, expressive and professional voice recordings for commercials,
          narration, e-learning, and character work.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
          {/* LISTEN DEMO -> scroll to #services if present, else navigate to /services */}
          <motion.button
            onClick={() => goToIdOrRoute("services", "/services")}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold shadow cursor-pointer"
            style={{ background: "linear-gradient(90deg,#ff9fb7,#b083ff)", color: "#000" }}
          >
            <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              🎧
            </motion.span>
            Listen demo
          </motion.button>

          {/* HIRE ME -> scroll to #hire if present, else navigate to /#hire (URL fallback) */}
          <motion.button
            onClick={() => {
              // try scroll to footer id first, otherwise navigate to root with hash
              const el = document.getElementById("hire");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "end" });
              } else {
                // fallback route (change if you have a dedicated contact/hire route)
                navigate("/#hire");
              }
            }}
            variants={buttonVariants}
            whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap="tap"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.06)", color: "#F2F2F2" }}
          >
            <motion.span animate={{ rotateY: [0, 180, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
              💼
            </motion.span>
            Hire me
          </motion.button>
        </motion.div>

        <motion.h2 variants={itemVariants} className="mt-8 text-lg md:text-xl font-medium" animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          I turn scripts into characters — clarity, tone and feeling in every take.
        </motion.h2>
      </div>
    </section>
  );
}
