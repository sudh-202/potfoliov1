"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold text-white"
          >
            Sudhanshu 

          </motion.div>
          <ul className="hidden md:flex space-x-8">
            {["Home", "About", "Projects", "Skills", "Contact"].map((item) => (
              <motion.li
                key={item}
                whileHover={{ y: -2 }}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                {item}
              </motion.li>
            ))}
          </ul>
          <div className="md:hidden">
            <button className="text-white">Menu</button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
