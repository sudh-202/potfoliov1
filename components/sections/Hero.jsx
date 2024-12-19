"use client";
import { motion } from "framer-motion";
import AnimatedBackground from "../ui/AnimatedBackground";

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0 bg-black"></div>

      {/* Animated lines background */}
      <AnimatedBackground />

      {/* Main Content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full border-2 border-[#00FF00] flex items-center justify-center rotate-12">
              <span className="text-[#00FF00] text-sm">JUST A STUDIO</span>
            </div>
          </div>
          <h1 className="text-9xl font-bold mb-4">
            <span className="text-white">BE WILD!</span>
            <br />
            <span className="text-[#00FF00]">CREATIVE!</span>
            <br />
            <span className="text-white">AND COOL!</span>
          </h1>
        </motion.div>
      </div>

      {/* Geometric Design */}
      <div className="absolute right-32 top-1/2 -translate-y-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1 }}
          className="w-48 h-48"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M50 0 L100 87 L0 87 Z"
              fill="none"
              stroke="#00FF00"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      </div>

      {/* Scroll Text */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-[#00FF00] text-sm"
        >
          - SCROLL CAREFULLY, IT'S SMOOTH -
          <br />
          <span className="text-xs">↑ • ◎ • 地 • 滑</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
