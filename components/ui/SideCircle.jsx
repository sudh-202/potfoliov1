"use client";
import React from 'react';
import { motion } from 'framer-motion';

const SideCircle = ({ side = 'left' }) => {
  return (
    <div className={`absolute ${side}-0 top-0 h-full w-20 flex flex-col justify-between py-4`}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-12 h-12 rounded-full border-2 border-[#00ff00] flex items-center justify-center"
      >
        <span className="text-2xl text-[#00ff00]">+</span>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`text-[#00ff00] text-sm tracking-widest ${side === 'left' ? '-rotate-90' : 'rotate-90'} whitespace-nowrap transform origin-center translate-y-20`}
      >
        PORTRAIT
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-2xl text-[#00ff00]"
      >
        ×
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-12 h-12 rounded-full border-2 border-[#00ff00] flex items-center justify-center"
      >
        <span className="text-2xl text-[#00ff00] hover:text-white">+</span>
      </motion.div>
    </div>
  );
};

export default SideCircle;
