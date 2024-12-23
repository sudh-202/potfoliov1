"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const ImageOverlap = () => {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [smoothScrollY, setSmoothScrollY] = useState(0);
  const animationRef = useRef(null);

  // Track scroll position with improved calculations
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Start when element enters viewport and end when it leaves
        const start = windowHeight;
        const end = -elementHeight;
        
        // Calculate progress
        const progress = (start - elementTop) / (start - end);
        const clampedProgress = Math.min(Math.max(progress, 0), 1) * 100;
        
        setScrollY(clampedProgress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth animation with optimized parameters
  useEffect(() => {
    const smoothScroll = () => {
      setSmoothScrollY(prev => {
        const diff = scrollY - prev;
        // Adjust this value for smoother/faster animation (0.1 = smooth, 0.3 = faster)
        return prev + diff * 0.15;
      });
      animationRef.current = requestAnimationFrame(smoothScroll);
    };

    animationRef.current = requestAnimationFrame(smoothScroll);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollY]);

  const clipValue = Math.max(0, Math.min(100, smoothScrollY));

  return (
    <div className="w-full py-[5vh] flex items-center justify-center">
      <div 
        ref={containerRef}
        className="relative w-[70vw] mx-auto h-[70vh] overflow-hidden rounded-xl"
      >
        {/* Base Image */}
        <div className="absolute inset-0">
          <img
            src="/images/2.png"
            alt="Base Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay Image */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(${clipValue}% 0 0 0)`,
            WebkitClipPath: `inset(${clipValue}% 0 0 0)`,
            willChange: 'clip-path'
          }}
        >
          <img
            src="/images/1.png"
            alt="Overlay Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Green Line */}
        <div
          className="absolute left-0 right-0 h-[2px] bg-[#00ff00] z-10 shadow-[0_0_10px_#00ff00]"
          style={{
            top: `${clipValue}%`,
            willChange: 'transform'
          }}
        />
      </div>
    </div>
  );
};

export default ImageOverlap;
