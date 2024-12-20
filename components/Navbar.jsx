"use client";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setHasScrolled(scrollY.get() > 50);
    };

    const unsubscribe = scrollY.on("change", updateScroll);
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        hasScrolled ? 'backdrop-blur-md bg-black/20' : 'bg-transparent'
      }`}
      initial={{ y: "-5vh" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-between items-center p-[2vw]">
        {/* Logo */}
        <motion.div 
          className="text-[1.5vw] text-white font-bold"
          whileHover={{ scale: 1.05 }}
        >
          STUDIO
        </motion.div>

        {/* Navigation Links */}
        <div className="flex gap-[2vw]">
          {["WORK", "ABOUT", "CONTACT"].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[1.2vw] text-white hover:text-[#00FF00] transition-colors"
              whileHover={{ y: "-0.5vh" }}
              initial={{ opacity: 0, y: "-2vh" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: 0.3 + index * 0.1,
              }}
            >
              {item}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
