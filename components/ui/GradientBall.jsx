"use client";
import { useState, useEffect } from "react";

const GradientBall = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Add pulse animation after drop-in completes
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    // Handle scroll to hide gradient ball after hero section
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsVisible(heroBottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`z-0 fixed top-0 left-1/2 w-[100vw] h-[80vh] ${
      isLoaded ? 'animate-pulse-scale' : 'animate-drop-in'
    }`}>
      {/* Flowing border container */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 rounded-full animate-border-flow bg-gradient-to-r"></div>
        <div className="absolute inset-0 rounded-full animate-border-flow bg-gradient-to-b" 
          style={{ animationDelay: '-1s' }}
        ></div>
      </div>
      
      {/* Main gradient ball */}
      <div className="relative w-full h-full">
        <div className="absolute inset-[3px] rounded-full bg-gradient-to-r from-green-400 via-green-600 to-green-800"></div>
      </div>
    </div>
  );
};

export default GradientBall;
