"use client";
import { motion } from "framer-motion";
import AnimatedBackground from "../ui/AnimatedBackground";
import CircularTextImage from "../ui/CircularTextImage";
import GradientBall from "@/components/ui/GradientBall";
import ScrollDown from "../ui/ScrollDown";

const Hero = () => {
  return (
    <div className="relative h-screen w-[100vw] overflow-hidden Z-20">
      {/* Dark background */}
      <div className="absolute inset-0 bg-black"></div>
      <GradientBall />

      {/* Animated lines background */}
      <AnimatedBackground />

      {/* Main Content */}
      <div className="absolute top-[50vh] left-[50vw] transform -translate-x-1/2 -translate-y-1/2 text-center w-full z-0">
        <motion.div
          initial={{ opacity: 0, y: "5vh" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ zoom: 1 }}
        >
          <h1 className="flex flex-col">
            <span className="text-white text-[8vw] font-bold leading-[8vw] flex items-center justify-center">
              <div
               className=""
              >
                <CircularTextImage />
              </div>
              BE WILD!
            </span>
            <span className="text-[#00FF00] text-[8vw] font-bold leading-[8vw]">
              CREATIVE!{" "}
              <div
                className="absolute z-10 bg-[#00FF00]  rounded-full right-[17vw]"
              >
                <motion.div
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 1 }}
                  className="w-[8vw] h-[8vw] "
                >
                  <iframe
                    src="https://lottie.host/embed/20ff52b7-2b9f-44a0-9945-75a5bc224b2d/1FFeEdRFSt.lottie"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </motion.div>
              </div>
            </span>
            <span className="text-white text-[8vw] font-bold leading-[8vw]">
              AND COOL!
            </span>
          </h1>
        </motion.div>
      </div>


      {/* Scroll Text */}
      <motion.div
        className="relative top-[80vh] z-10 text-center "
        initial={{ opacity: 0, y: "2vh" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        style={{
          transform: "translateX(-50%)",
        }}
      >
        <div className="text-[#00FF00] flex flex-col items-center">
          <span className="text-[1.2vw] whitespace-nowrap flex flex-col items-center gap-4">
            <ScrollDown/>
            - SCROLL CAREFULLY, ITS SMOOTH -
          </span>
          <span className="text-[1vw] mt-[0.5vh]">↑ • ◎ • 地 • 滑</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
