"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const { ref, controls } = useScrollAnimation();

  return (
    <section
      id="about"
      ref={containerRef}
      className="min-h-screen relative py-20 bg-black overflow-hidden"
    >
      <motion.div style={{ y }} className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                staggerChildren: 0.2,
              },
            },
          }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Me
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Passionate about creating beautiful and functional digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Web Development",
              description: "Building responsive and modern web applications",
              icon: "🌐",
            },
            {
              title: "UI/UX Design",
              description: "Creating intuitive and beautiful user interfaces",
              icon: "🎨",
            },
            {
              title: "Problem Solving",
              description: "Finding elegant solutions to complex problems",
              icon: "💡",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                z: 50,
              }}
              className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 transform perspective-1000"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-gray-400">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Parallax Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1)_0%,transparent_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-purple-500/5 to-black/0" />
    </section>
  );
}
