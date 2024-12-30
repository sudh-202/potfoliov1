"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { skillsData } from '@/constants/skillsData';

const StickHero = dynamic(() => import('@/components/game/StickHero'), {
  ssr: false
});

const Skills = () => {
  const { skills, bottomSection } = skillsData;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const horseY = useTransform(scrollYProgress, [0, 1], ["25vh", "-15vh"]);
  const brainY = useTransform(scrollYProgress, [0, 1], ["0vh", "-65vh"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0vh", "15vh"]);

  const MediaContainer = ({ src, className }) => {
    const videoRef = useRef(null);
    const [isClient, setIsClient] = useState(false);
    const isVideo = src.endsWith('.mp4');

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (!isClient || !isVideo) return;

      const video = videoRef.current;
      if (!video) return;

      let observer;

      const setupObserver = () => {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                video.play().catch((err) => {
                  console.error('Video playback failed:', err);
                });
              } else {
                video.pause();
              }
            });
          },
          { threshold: 0.5 }
        );

        observer.observe(video);
      };

      setupObserver();

      return () => {
        if (observer) {
          observer.disconnect();
        }
        if (video) {
          video.pause();
        }
      };
    }, [isClient, isVideo]);

    if (!isClient) {
      return (
        <div className={`${className} bg-black/90 flex items-center justify-center`}>
          <div className="text-white/50 text-[1.5vw]">Loading...</div>
        </div>
      );
    }

    if (!isVideo) {
      return (
        <div className={className}>
          <Image
            src={src}
            alt="Skill illustration"
            width={400}
            height={300}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      );
    }

    return (
      <video
        ref={videoRef}
        className={className}
        loop
        muted
        playsInline
        preload="auto"
        controls
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };

  return (
    <section className="z-30 relative bg-black overflow-hidden py-[10vh]" id="skills">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-[90vw] mx-auto mb-[10vh]"
      >
        <h2 className="text-[6vw] font-bold leading-tight flex items-center justify-center">
          <span className="text-white">WHAT</span>{' '}
          <span className="text-[#00FF00]">SKILLS</span>{' '}
          <span className="text-white">CAN I HAVE</span>
          <span className="text-[#00FF00] text-[10vw] ml-[2vw]">?</span>
        </h2>
      </motion.div>

      {/* Skills Grid */}
      <div className="w-[70vw] mx-auto">
        <div className="space-y-[20vh]">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex items-center justify-between ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className="space-y-[2vh]">
                <div className="text-white text-[3vw] font-bold">I&apos;M A</div>
                <h3 className="text-[#00FF00] text-[4vw] font-bold leading-none">
                  {skill.title}
                </h3>
                <p className="text-white/70 text-[1.5vw]">{skill.description}</p>
                <div className="text-[15vw] font-bold text-white/10 leading-none">
                  {skill.number}
                </div>
              </div>
              <div className="relative bg-black/90 rounded-lg overflow-hidden">
                <div className="absolute inset-0 border-4 border-white/20 rounded-lg z-10 shadow-[10px_10px_0px_0px_rgba(255,255,255,1)]"></div>
                <MediaContainer
                  src={skill.video}
                  className="w-[24vw] object-contain bg-black border-white -mt-10 -mr-4"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Creative Section */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="w-[68vw] mx-auto mt-[15vh] flex items-center justify-between relative min-h-[50vh]"
      >
        <motion.div 
          style={{ y: horseY }}
          className="relative bg-black/90 rounded-lg overflow-hidden"
        >
          <div className="absolute inset-0 rounded-lg z-10"></div>
          <MediaContainer
            src="/images/horse.svg"
            className="w-[10vw] object-contain mt-[25vh] z-20 bg-black"
          />
        </motion.div>

        <motion.div 
          style={{ y: textY }}
          className="text-center space-y-[2vh] z-20"
        >
          <div className="text-white text-[3vw] font-bold">{bottomSection.creativity.title}</div>
          <div className="text-[5vw] font-bold">
            <span className="text-white">{bottomSection.creativity.line1.start}</span>{' '}
            <span className="text-[#00FF00]">{bottomSection.creativity.line1.end}</span>
          </div>
          <div className="text-[4vw] font-bold">
            <span className="text-[#00FF00]">{bottomSection.creativity.line2.start}</span>{' '}
            <span className="text-white">{bottomSection.creativity.line2.end}</span>
          </div>
        </motion.div>

        <motion.div 
          style={{ y: brainY }}
          className="relative bg-black/90 rounded-lg overflow-hidden mt-[22vw]"
        >
          <div className="absolute inset-0 rounded-lg z-10"></div>
          <MediaContainer
            src="/images/brain.svg"
            className="w-[10vw] object-contain bg-black z-10"
          />
        </motion.div>
      </motion.div>

      {/* Stick Hero Game Section */}
      <StickHero />
    </section>
  );
};

export default Skills;
