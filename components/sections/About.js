"use client";
import React from "react";
import { motion } from "framer-motion";
import ImageOverlap from "@/components/sections/ImageOverlap";

// Text reveal animation variants
const textRevealVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
    },
  }),
};

export default function About() {
  const text = "About Us".split("");
  const [activeLetterIndex, setActiveLetterIndex] = React.useState(-1);
  const titleRef = React.useRef(null);
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.3, // Start when 30% of the element is visible
        rootMargin: "0px"
      }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (!isInView) {
      setActiveLetterIndex(-1);
      return;
    }

    const handleScroll = () => {
      const element = titleRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const windowHeight = window.innerHeight;
      const scrollProgress = 1 - (elementTop / (windowHeight * 0.7)); // Adjust for 30% threshold
      
      const newIndex = Math.floor(scrollProgress * text.length);
      if (newIndex >= -1 && newIndex < text.length) {
        setActiveLetterIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isInView, text.length]);

  return (
    <div id="about" className="relative z-30 flex flex-col items-center justify-start py-[10vh]">
      <div className="bg-black rounded-2xl border-2 border-white/45 px-[2vw] py-[5vh] flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center my-[5vh]"
        >
          <h2 
            ref={titleRef}
            className="text-[8vw] leading-[5vw] font-bold mb-[2vh] text-white flex items-center justify-center"
          >
            {text.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={textRevealVariants}
                className={char === ' ' ? 'mr-[2vw]' : 'inline-block'}
                style={{ 
                  color: i <= activeLetterIndex ? '#00ff00' : 'white',
                  transition: 'color 0.3s ease'
                }}
              >
                {char}
              </motion.span>
            ))}
          </h2>
          <div className="flex flex-row gap-6 items-center justify-between">
            <p className="text-left text-[0.95vw] text-white font-bold hover:scale-150 transition-transform">
              Hello, this is Sudhanshu, a full-stack <br/>developer
              Lets do some cool things !! 
            </p>
            <h3 
              className="font-playwrite font-bold text-[5vw] text-[#00ff00] rotate-[8deg] hover:scale-110 hover:rotate-[2deg] tracking-tighter transition-transform duration-300"
              style={{
                textShadow: '0 0 10px rgba(0, 255, 0, 0.5)'
              }}
            >
              whoami?
            </h3>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full relative"
        >
          <div className="relative z-10">
            <ImageOverlap />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
