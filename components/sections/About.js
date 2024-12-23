"use client";
import React from "react";
import { motion } from "framer-motion";
import ImageOverlap from "@/components/sections/ImageOverlap";

export default function About() {
  const text = "About Me";
  const letters = Array.from(text);

  return (
    <div id="about" className="min-h-screen z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 pt-20"
      >
        <h2 className="text-3xl md:text-7xl font-bold mb-4">
          {letters.map((letter, index) => (
            <motion.span key={index} className="inline-block">
              {letter}
            </motion.span>
          ))}
        </h2>
        <div className="w-24 h-1 bg-[#00FF00] mx-auto rounded-full"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full"
      >

      <ImageOverlap />

      </motion.div>

      
    </div>
  );
}
