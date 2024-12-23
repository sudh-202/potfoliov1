"use client";
import { useState, useEffect } from "react";

const GradientBall = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add pulse animation after drop-in completes
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000); // Same as drop-in duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`z-10 fixed top-0 left-1/2 w-[100vw] h-[80vh] ${
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
