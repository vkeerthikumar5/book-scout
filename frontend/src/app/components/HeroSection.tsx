"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // ✅ App Router Link

export default function HeroSection() {
  

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-700 to-blue-900 relative flex flex-col">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg')",
        }}
      ></div>

      

      {/* Hero Section */}
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-6">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white drop-shadow-lg"
        >
          BookScout
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200"
        >
          Discover. Explore. Collect Knowledge.
        </motion.p>

        {/* Button */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>
          <Link
            href="/categories"
            className="mt-8 inline-block px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 
                       text-sm sm:text-base md:text-lg 
                       bg-white text-blue-700 font-semibold 
                       rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            Explore Now
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
