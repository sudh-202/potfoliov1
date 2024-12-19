"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const GradientBalls = () => {
  const leftBallX = useMotionValue(0);
  const leftBallY = useMotionValue(0);
  const rightBallX = useMotionValue(0);
  const rightBallY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const leftSpringX = useSpring(leftBallX, springConfig);
  const leftSpringY = useSpring(leftBallY, springConfig);
  const rightSpringX = useSpring(rightBallX, springConfig);
  const rightSpringY = useSpring(rightBallY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const halfWidth = windowWidth / 2;
      const scrollY = window.scrollY;

      // Left ball movement (only in left half)
      if (clientX < halfWidth) {
        const leftX = (clientX / halfWidth) * 100 - 50;
        const leftY = ((clientY + scrollY) / window.innerHeight) * 100 - 50;
        leftBallX.set(leftX);
        leftBallY.set(leftY);
      }

      // Right ball movement (only in right half)
      if (clientX >= halfWidth) {
        const rightX = ((clientX - halfWidth) / halfWidth) * 100 - 50;
        const rightY = ((clientY + scrollY) / window.innerHeight) * 100 - 50;
        rightBallX.set(rightX);
        rightBallY.set(rightY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [leftBallX, leftBallY, rightBallX, rightBallY]);

  return (
    <div className="fixed inset-0 w-full h-[200vh] pointer-events-none" style={{ zIndex: 2 }}>
      {/* Left Gradient Ball */}
      <motion.div
        className="absolute w-[1000px] h-[1000px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(0,255,0,0.3) 0%, rgba(0,255,0,0) 70%)",
          left: "0%",
          top: "50%",
          x: leftSpringX,
          y: leftSpringY,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "screen"
        }}
      />
      {/* Right Gradient Ball */}
      <motion.div
        className="absolute w-[1000px] h-[1000px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(0,255,0,0.3) 0%, rgba(0,255,0,0) 70%)",
          right: "0%",
          top: "50%",
          x: rightSpringX,
          y: rightSpringY,
          transform: "translate(50%, -50%)",
          mixBlendMode: "screen"
        }}
      />
    </div>
  );
};

export default GradientBalls;
