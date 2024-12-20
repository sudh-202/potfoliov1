"use client";
import { useEffect, useState } from 'react';

const CursorClick = () => {
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const newClick = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };
      
      setClicks((prev) => [...prev, newClick]);
      
      // Remove click effect after animation
      setTimeout(() => {
        setClicks((prev) => prev.filter((click) => click.id !== newClick.id));
      }, 700);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {clicks.map((click) => (
        <div
          key={click.id}
          className="fixed pointer-events-none z-50 text-yellow-300 text-3xl"
          style={{
            left: click.x,
            top: click.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Sparkle effect */}
          <div className="relative ">
            <div className="absolute animate-star-1 opacity-0">✦</div>
            <div className="absolute animate-star-2 opacity-0">✧</div>
            <div className="absolute animate-star-3 opacity-0">⋆</div>
            <div className="absolute animate-star-4 opacity-0">✦</div>
            {/* Center sparkle */}
            <div className="absolute animate-star-center opacity-0 scale-150">✨</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CursorClick;
