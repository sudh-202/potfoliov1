"use client";
import { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      // Show/hide based on scroll position
      setIsVisible(window.scrollY > 100);
    };

    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/10 z-50">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-green-600"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Scroll indicator */}
      <div 
        className={`fixed right-8 bottom-8 z-50 transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="relative w-12 h-12 rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center group cursor-pointer"
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative text-2xl transform rotate-180">↓</span>
          
          {/* Progress circle */}
          <svg
            className="absolute inset-0 transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              className="text-black/5"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="44"
              cx="50"
              cy="50"
            />
            <circle
              className="text-green-500 transition-all duration-300"
              strokeWidth="4"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="44"
              cx="50"
              cy="50"
              strokeDasharray={`${scrollProgress * 2.76} 276`}
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default ScrollProgress;
