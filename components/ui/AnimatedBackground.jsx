"use client";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Vertical Lines */}
      <div className="absolute inset-0 flex justify-around">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="h-[100vh] w-[0.1vw] bg-[#00ff00a6] opacity-20"
            initial={{ height: 0 }}
            animate={{ height: "100vh" }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Horizontal Lines */}
      <div className="absolute inset-0 flex flex-col justify-around">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="w-[100vw] h-[0.1vw] bg-[#00ff00a6] opacity-20"
            initial={{ width: 0 }}
            animate={{ width: "100vw" }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
