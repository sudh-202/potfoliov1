"use client";

const GradientBall = () => {
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 -translate-y-[75%] w-[100vw] h-[100vh]">
      {/* Flowing border container */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 rounded-full animate-border-flow bg-gradient-to-r "></div>
        <div className="absolute inset-0 rounded-full animate-border-flow bg-gradient-to-b   " style={{ animationDelay: '-1s' }}></div>
      </div>
      
      {/* Main gradient ball */}
      <div className="relative w-full h-full">
        <div className="absolute inset-[3px] rounded-full bg-gradient-to-r from-green-400 via-green-600 to-green-800"></div>
      </div>
    </div>
  );
};

export default GradientBall;
