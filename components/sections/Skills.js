"use client";
import { motion } from "framer-motion";

const Skills = () => {
  const skills = [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TailwindCSS", "TypeScript", "Framer Motion"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "GraphQL"],
    },
    {
      category: "Tools",
      items: ["Git", "Docker", "AWS", "Figma", "VS Code"],
    },
  ];

  return (
    <section className="z-30 relative min-h-screen bg-black overflow-hidden py-20" id="skills">
      {/* Gradient Balls */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #00FF00 0%, rgba(0,255,0,0) 70%)",
          left: "10%",
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
            <span className="text-[#00FF00]">Technical</span> Skills
          </h2>
          <div className="w-24 h-1 bg-[#00FF00] mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skillSet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-black/40 backdrop-blur-sm border border-[#00FF00]/20 rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold mb-6 text-[#00FF00]">
                {skillSet.category}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {skillSet.items.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: (index * skillSet.items.length + skillIndex) * 0.1,
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#00FF00]"></div>
                    <span className="text-gray-300">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill Bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {[
            { skill: "Frontend Development", progress: 90 },
            { skill: "Backend Development", progress: 85 },
            { skill: "UI/UX Design", progress: 80 },
            { skill: "Problem Solving", progress: 95 },
          ].map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">{item.skill}</span>
                <span className="text-[#00FF00]">{item.progress}%</span>
              </div>
              <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-[#00FF00]/20">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className="h-full bg-[#00FF00]"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
