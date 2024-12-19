"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function Skills() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const { ref, controls } = useScrollAnimation();

  const skills = [
    { name: "React", level: 90, color: "from-blue-500 to-cyan-500" },
    { name: "Next.js", level: 85, color: "from-gray-500 to-gray-900" },
    { name: "JavaScript", level: 88, color: "from-yellow-400 to-yellow-600" },
    { name: "TypeScript", level: 80, color: "from-blue-400 to-blue-600" },
    { name: "TailwindCSS", level: 92, color: "from-cyan-400 to-blue-500" },
    { name: "Node.js", level: 85, color: "from-green-500 to-green-700" },
  ];

  return (
    <section
      id="skills"
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
              },
            },
          }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Skills & Expertise
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="relative"
            >
              <div className="mb-2 flex justify-between">
                <span className="text-white font-medium">{skill.name}</span>
                <span className="text-gray-400">{skill.level}%</span>
              </div>
              <div className="h-3 bg-gray-900 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-4 h-4 bg-white/5 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Parallax Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1)_0%,transparent_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-purple-500/5 to-black/0" />
    </section>
  );
}
