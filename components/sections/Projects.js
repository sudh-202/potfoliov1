"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const { ref, controls } = useScrollAnimation();

  const projects = [
    {
      title: "Project One",
      description: "A modern web application built with Next.js and TailwindCSS",
      image: "/project1.jpg", // Add your project images
      tags: ["Next.js", "React", "TailwindCSS"],
    },
    {
      title: "Project Two",
      description: "An e-commerce platform with dynamic features",
      image: "/project2.jpg",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Project Three",
      description: "A real-time chat application with WebSocket",
      image: "/project3.jpg",
      tags: ["Socket.io", "Express", "React"],
    },
  ];

  return (
    <section
      id="projects"
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
            Featured Projects
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent works
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
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
                rotateY: 5,
                z: 50,
              }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 transform perspective-1000"
            >
              <div className="relative h-48 bg-gray-800">
                {/* Add your project image here */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Parallax Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1)_0%,transparent_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-cyan-500/5 to-black/0" />
    </section>
  );
}
