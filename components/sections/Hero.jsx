"use client";
import { motion } from "framer-motion";
import AnimatedBackground from "../ui/AnimatedBackground";

const Hero = () => {
  return (
    <div className="relative h-[100vh] w-[100vw] overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0 bg-black"></div>

      {/* Animated lines background */}
      <AnimatedBackground />

      {/* Main Content */}
      <div className="absolute top-[50vh] left-[50vw] transform -translate-x-1/2 -translate-y-1/2 text-center w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ zoom: 1 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div 
              className="rounded-full border-2 border-[#00FF00] flex items-center justify-center rotate-12"
              style={{ 
                width: '120px', 
                height: '120px',
                minWidth: '120px',
                minHeight: '120px'
              }}
            >
              <span className="text-[#00FF00]" style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>JUST A STUDIO</span>
            </div>
          </div>
          <h1 style={{ 
            fontSize: 'clamp(60px, 8vw, 120px)', 
            lineHeight: '1.2',
            whiteSpace: 'nowrap'
          }}>
            <span className="text-white">BE WILD!</span>
            <br />
            <span className="text-[#00FF00]">CREATIVE!</span>
            <br />
            <span className="text-white">AND COOL!</span>
          </h1>
        </motion.div>
      </div>

      {/* Geometric Design */}
      <div 
        className="absolute z-10"
        style={{
          right: 'max(32px, 5vw)',
          top: '50vh',
          transform: 'translateY(-50%)'
        }}
      >
        <motion.div
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1 }}
          style={{ 
            width: 'clamp(120px, 15vw, 200px)',
            height: 'clamp(120px, 15vw, 200px)',
            minWidth: '120px',
            minHeight: '120px'
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
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
      <div 
        className="absolute left-[50vw] text-center z-10"
        style={{
          bottom: 'max(24px, 3vh)',
          transform: 'translateX(-50%)',
          fontSize: 'clamp(12px, 1.5vw, 16px)'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-[#00FF00]"
          style={{ whiteSpace: 'nowrap' }}
        >
          - SCROLL CAREFULLY, IT&apos;S SMOOTH -
          <br />
          <span style={{ fontSize: '0.8em' }}>↑ • ◎ • 地 • 滑</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
