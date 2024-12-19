"use client";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  // Define lines for both Hero and About sections
  const paths = [
    // Left side circle path
    "M 0 300 C 100 300, 300 100, 300 300 C 300 500, 100 500, 0 300",
    
    // Right side circle path
    "M 1600 300 C 1500 300, 1300 100, 1300 300 C 1300 500, 1500 500, 1600 300",
    
    // Top diagonal lines
    "M -100 0 L 300 400",
    "M 1700 0 L 1300 400",
    
    // Hero to About connecting lines
    "M -100 800 L 400 1200",
    "M 1700 800 L 1200 1200",
    
    // About section circle paths
    "M 0 1200 C 100 1200, 300 1000, 300 1200 C 300 1400, 100 1400, 0 1200",
    "M 1600 1200 C 1500 1200, 1300 1000, 1300 1200 C 1300 1400, 1500 1400, 1600 1200"
  ];

  return (
    <div className="fixed inset-0 w-full h-[200vh] pointer-events-none" style={{ zIndex: 1 }}>
      <svg 
        className="w-full h-full" 
        viewBox="0 0 1600 2000" 
        preserveAspectRatio="none"
      >
        {paths.map((path, index) => (
          <motion.path
            key={index}
            d={path}
            stroke="#00FF00"
            strokeWidth="1.5"
            fill="none"
            initial={{ 
              pathLength: 0,
              opacity: 0,
            }}
            animate={{ 
              pathLength: [0, 1],
              opacity: [0, 0.4, 0.4, 0],
            }}
            transition={{
              duration: 6,
              ease: "linear",
              repeat: Infinity,
              delay: index * 0.8,
              opacity: {
                duration: 6,
                times: [0, 0.2, 0.8, 1],
                ease: "linear",
                repeat: Infinity,
                delay: index * 0.8
              }
            }}
          />
        ))}

        {/* Straight lines in background */}
        <motion.line 
          x1="-100" 
          y1="0" 
          x2="1700" 
          y2="0"
          stroke="#00FF00"
          strokeWidth="1"
          strokeOpacity="0.1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
        <motion.line 
          x1="-100" 
          y1="1000" 
          x2="1700" 
          y2="1000"
          stroke="#00FF00"
          strokeWidth="1"
          strokeOpacity="0.1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            delay: 1
          }}
        />
      </svg>
    </div>
  );
};

export default AnimatedBackground;
