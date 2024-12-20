"use client";
import { useState, useEffect, useRef } from "react";

const CircularTextImage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSurprised, setIsSurprised] = useState(false);
  const faceRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (faceRef.current) {
        const faceRect = faceRef.current.getBoundingClientRect();
        const faceCenterX = faceRect.left + faceRect.width / 2;
        const faceCenterY = faceRect.top + faceRect.height / 2;
        
        // Calculate angle between mouse and face center
        const angle = Math.atan2(e.clientY - faceCenterY, e.clientX - faceCenterX);
        
        // Calculate distance for movement intensity
        const distance = Math.min(
          Math.hypot(e.clientX - faceCenterX, e.clientY - faceCenterY) / 100,
          1
        );
        
        // Convert angle to x/y coordinates with distance-based intensity
        setMousePosition({
          x: Math.cos(angle) * distance * 5,
          y: Math.sin(angle) * distance * 5
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const eyeStyle = {
    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
  };

  return (
    <div className="relative w-[10vw] h-[10vw]">
      {/* CSS Face */}
      <div 
        ref={faceRef}
        className="absolute inset-0 rounded-full border-4 border-white overflow-hidden scale-75"
        onMouseEnter={() => setIsSurprised(true)}
        onMouseLeave={() => setIsSurprised(false)}
      >
        <div className="relative w-full h-full bg-[#00FF00] rounded-full animate-squish">
          {/* Eyes Container */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 flex gap-[2vw]">
            {/* Left Eye */}
            <div className={`relative w-[1.2vw] h-[1.2vw] min-w-[8px] min-h-[8px] bg-black rounded-full transition-all duration-300 ${
              isSurprised ? 'h-[1.8vw] scale-y-125' : ''
            }`}>
              <div 
                className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-white rounded-full transition-all duration-100 ease-out"
                style={eyeStyle}
              >
                {/* Eye Shine */}
                <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-white/50 rounded-full blur-[1px]"></div>
              </div>
            </div>
            {/* Right Eye */}
            <div className={`relative w-[1.2vw] h-[1.2vw] min-w-[8px] min-h-[8px] bg-black rounded-full transition-all duration-300 ${
              isSurprised ? 'h-[1.8vw] scale-y-125' : ''
            }`}>
              <div 
                className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-white rounded-full transition-all duration-100 ease-out"
                style={eyeStyle}
              >
                {/* Eye Shine */}
                <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-white/50 rounded-full blur-[1px]"></div>
              </div>
            </div>
          </div>

          {/* Expression */}
          <div 
            className={`absolute bottom-[30%] left-1/2 -translate-x-1/2 transition-all duration-300 ${
              isSurprised 
                ? 'w-[2vw] h-[2vw] rounded-full border-none bg-black' 
                : 'w-[4vw] h-[2vw] min-w-[20px] min-h-[10px] border-[0.3vw] border-t-0 border-black rounded-b-[2vw]'
            }`}
          ></div>

          {/* Shine Effect */}
          <div className="absolute top-[10%] left-[10%] w-[20%] h-[20%] bg-white/30 rounded-full blur-[0.5vw] animate-shine"></div>
        </div>
      </div>
    </div>
  );
};

export default CircularTextImage;
