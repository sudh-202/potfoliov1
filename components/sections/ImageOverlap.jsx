"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Lerp function for smooth interpolation
const lerp = (start, end, factor) => start * (1 - factor) + end * factor;

const ImageOverlap = () => {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [smoothScrollY, setSmoothScrollY] = useState(0);
  const animationRef = useRef(null);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how much of the container is in view
        const visiblePercentage = Math.max(
          0,
          Math.min(
            100,
            ((windowHeight - rect.top) / (windowHeight + rect.height)) * 100
          )
        );
        setScrollY(visiblePercentage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth animation loop
  useEffect(() => {
    const smoothScroll = () => {
      // Smooth out the scroll value with lerp
      setSmoothScrollY(prev => lerp(prev, scrollY, 0.1));
      animationRef.current = requestAnimationFrame(smoothScroll);
    };

    animationRef.current = requestAnimationFrame(smoothScroll);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollY]);

  // Transform smooth scroll percentage to clip value
  const clipValue = Math.max(0, Math.min(100, smoothScrollY));

  return (
    <div className="w-full py-20 flex items-center justify-center">
      <div 
        ref={containerRef}
        className="relative w-full max-w-7xl mx-auto h-[70vh] overflow-hidden rounded-xl"
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
            transition: 'all 0.01s linear'
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
            transition: 'all 0.01s linear'
          }}
        >
          {/* Line Handle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Side Labels */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 transform -rotate-90 text-xs tracking-widest text-white">PORTRAIT</div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 transform rotate-90 text-xs tracking-widest text-white">PORTRAIT</div>
      </div>
    </div>
  );
};

export default ImageOverlap;
