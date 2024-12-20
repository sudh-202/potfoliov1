import React from "react";

const ScrollDown = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If no specific section, scroll one viewport height
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div 
        className="w-[2vw] h-[4vw] border-[0.15vw] border-white rounded-full p-[0.2vw] animate-bounce-slow cursor-pointer hover:scale-110 transition-transform"
        onClick={scrollToNextSection}
        role="button"
        aria-label="Scroll to next section"
      >
        <div className="w-[0.5vw] h-[0.5vw] bg-white rounded-full animate-scroll mx-auto"></div>
      </div>
    </div>
  );
};

export default ScrollDown;
