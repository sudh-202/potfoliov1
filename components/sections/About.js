"use client";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="relative min-h-screen overflow-hidden py-20" id="about">
      {/* Dark background */}
      <div className="absolute inset-0 bg-black"></div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold mb-4 font-unbounded">
            <span className="text-[#00FF00]">About</span> Me
          </h2>
          <div className="w-24 h-1 bg-[#00FF00] mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg"
          >
            <p className="text-gray-300">
              I am a passionate <span className="text-[#00FF00] font-semibold">Full Stack Developer</span> with expertise in creating beautiful and functional web applications.
            </p>
            <p className="text-gray-300">
              My journey in web development started with a curiosity for creating interactive experiences, and has evolved into a deep understanding of both frontend and backend technologies.
            </p>
            <div className="flex flex-wrap gap-4">
              {["React", "Next.js", "Node.js", "TypeScript", "MongoDB"].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-black/40 border border-[#00FF00]/20 rounded-full text-[#00FF00] text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden border-2 border-[#00FF00]/20 relative">
              <div className="absolute inset-0 bg-[#00FF00]/5"></div>
              {/* Add your image here */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
