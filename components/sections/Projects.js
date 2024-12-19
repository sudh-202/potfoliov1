"use client";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      title: "Project One",
      description: "A modern web application built with Next.js and TailwindCSS",
      tech: ["Next.js", "React", "TailwindCSS"],
      image: "/project1.jpg",
    },
    {
      title: "Project Two",
      description: "Full-stack application with real-time features",
      tech: ["Node.js", "Socket.io", "MongoDB"],
      image: "/project2.jpg",
    },
    {
      title: "Project Three",
      description: "E-commerce platform with advanced features",
      tech: ["React", "Redux", "Stripe"],
      image: "/project3.jpg",
    },
  ];

  return (
    <section className="relative min-h-screen bg-black overflow-hidden py-20" id="projects">
      {/* Gradient Balls */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #00FF00 0%, rgba(0,255,0,0) 70%)",
          left: "-10%",
          top: "20%",
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #00FF00 0%, rgba(0,255,0,0) 70%)",
          right: "-10%",
          bottom: "10%",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold mb-4 font-unbounded">
            <span className="text-[#00FF00]">Featured</span> Projects
          </h2>
          <div className="w-24 h-1 bg-[#00FF00] mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-black/40 backdrop-blur-sm border border-[#00FF00]/20 rounded-xl overflow-hidden"
            >
              <div className="aspect-video relative">
                <div className="absolute inset-0 bg-[#00FF00]/5"></div>
                {/* Add project image here */}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-black/40 border border-[#00FF00]/20 rounded-full text-[#00FF00] text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
