"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import GradientBalls from "@/components/ui/GradientBalls";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Background elements with proper stacking */}
      <div className="fixed inset-0 w-full h-full">
        <AnimatedBackground />
      </div>
      <div className="fixed inset-0 w-full h-full">
        <GradientBalls />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </main>
  );
}
