"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ${
          clicked ? 'scale-75' : 'scale-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%)`,
        }}
      >
        <div className="relative">
         <Image  src="/1.webp" width={30} height={30} alt="Custom cursor" />
        </div>
      </div>

      {/* Click effect */}
      {clicked && (
        <div
          className="fixed pointer-events-none z-50 mix-blend-difference"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: `translate(-50%, -50%)`,
          }}
        >
          <div className="w-12 h-12 border-2 border-white rounded-full animate-ping" />
        </div>
      )}
    </>
  );
};

export default CustomCursor;
