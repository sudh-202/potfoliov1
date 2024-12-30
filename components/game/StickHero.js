"use client";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const StickHero = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const gameStateRef = useRef({
    ctx: null,
    stickLength: 0,
    growing: false,
    walking: false,
    platformGap: 0,
    platforms: [],
    characterX: 50,
    characterY: 0,
    baseHeight: 0,
    animationFrame: null,
    score: 0,
    trees: [],
    backgroundOffset: 0,
    stickAngle: -Math.PI/2,
    gameSpeed: 1,
    currentPlatformIndex: 0,
    viewportOffset: 0,
    stickGrowthSpeed: 2,
    walkingSpeed: 6,
    initialWalkingSpeed: 6
  });

  const generatePlatform = (startX, isFirst = false) => {
    const width = isFirst ? 100 : 40 + Math.random() * 60;
    const gap = isFirst ? 0 : 80 + Math.random() * (120 * gameStateRef.current.gameSpeed);
    return {
      x: startX + gap,
      width: width,
      passed: false
    };
  };

  const generateInitialPlatforms = () => {
    const platforms = [];
    let currentX = 0;
    
    // First platform
    platforms.push(generatePlatform(currentX, true));
    currentX = platforms[0].x + platforms[0].width;
    
    // Generate next 5 platforms
    for (let i = 0; i < 5; i++) {
      const platform = generatePlatform(currentX);
      platforms.push(platform);
      currentX = platform.x + platform.width;
    }
    
    return platforms;
  };

  const addNewPlatform = () => {
    const state = gameStateRef.current;
    const lastPlatform = state.platforms[state.platforms.length - 1];
    
    // Generate new platform with position relative to the last one
    const newPlatform = generatePlatform(lastPlatform.x + lastPlatform.width);
    state.platforms.push(newPlatform);
    
    // Keep generating platforms ahead of the player
    if (state.platforms.length < state.currentPlatformIndex + 5) {
      addNewPlatform();
    }
  };

  const updateViewport = () => {
    const state = gameStateRef.current;
    const canvas = state.ctx.canvas;
    const currentPlatform = state.platforms[state.currentPlatformIndex];
    
    // Calculate target offset to keep character in view
    const targetOffset = -(currentPlatform.x - canvas.width * 0.2);
    
    // Even smoother viewport movement using easing
    const ease = 0.15;
    state.viewportOffset += (targetOffset - state.viewportOffset) * ease;
    
    // Smooth background parallax
    state.backgroundOffset = state.viewportOffset * 0.7;
  };

  const generateTrees = (width) => {
    const trees = [];
    const numTrees = Math.floor(width / 100); // One tree every 100px approximately
    for (let i = 0; i < numTrees; i++) {
      trees.push({
        x: Math.random() * width,
        scale: 0.5 + Math.random() * 0.5
      });
    }
    return trees;
  };

  const drawTree = (ctx, x, scale, isBackground = false) => {
    const treeHeight = isBackground ? 30 * scale : 40 * scale;
    const treeWidth = isBackground ? 20 * scale : 30 * scale;
    
    // Adjust color based on whether it's a background tree
    ctx.fillStyle = isBackground ? '#002200' : '#00CC00';
    
    // Draw triangle for tree
    ctx.beginPath();
    ctx.moveTo(x, gameStateRef.current.baseHeight - treeHeight);
    ctx.lineTo(x - treeWidth/2, gameStateRef.current.baseHeight - treeHeight/3);
    ctx.lineTo(x + treeWidth/2, gameStateRef.current.baseHeight - treeHeight/3);
    ctx.closePath();
    ctx.fill();
  };

  const drawBackground = (ctx) => {
    const state = gameStateRef.current;
    const { viewportOffset } = state;
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    
    // Draw sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, state.baseHeight);
    gradient.addColorStop(0, '#000000');
    gradient.addColorStop(1, '#001100');
    ctx.fillStyle = gradient;
    ctx.fillRect(-viewportOffset, 0, canvasWidth * 2, state.baseHeight);

    // Draw background trees first
    const bgTreeSpacing = 80;
    const visibleStartBg = -viewportOffset - 200;
    const visibleEndBg = -viewportOffset + canvasWidth + 200;
    
    for(let x = visibleStartBg; x < visibleEndBg; x += bgTreeSpacing) {
      const treeX = x + (Math.sin(x * 0.2) * 20);
      const scale = 0.3 + Math.abs(Math.sin(x * 0.1)) * 0.3;
      drawTree(ctx, treeX, scale, true);
    }

    // Draw hills
    ctx.fillStyle = '#003300';
    ctx.beginPath();
    ctx.moveTo(-viewportOffset, state.baseHeight);
    
    const startX = Math.floor(-viewportOffset / 50) * 50;
    const endX = startX + canvasWidth * 2;
    
    for(let i = startX; i <= endX; i += 50) {
      const xPos = i;
      const yPos = state.baseHeight - 20 * Math.sin((i + state.backgroundOffset)/100);
      ctx.lineTo(xPos, yPos);
    }
    
    ctx.lineTo(endX, canvasHeight);
    ctx.lineTo(startX, canvasHeight);
    ctx.closePath();
    ctx.fill();

    // Draw foreground trees
    const treeSpacing = 100;
    const visibleStart = -viewportOffset - 100;
    const visibleEnd = -viewportOffset + canvasWidth + 100;
    
    for(let x = visibleStart; x < visibleEnd; x += treeSpacing) {
      const treeX = x + (Math.sin(x * 0.1) * 30);
      const scale = 0.5 + Math.abs(Math.sin(x * 0.05)) * 0.5;
      drawTree(ctx, treeX, scale, false);
    }
  };

  const growStick = () => {
    const state = gameStateRef.current;
    if (!state.growing || gameOver) return;

    state.stickLength += state.stickGrowthSpeed;
    drawGame();
    state.animationFrame = requestAnimationFrame(growStick);
  };

  const moveCharacter = () => {
    const state = gameStateRef.current;
    if (!state.walking || gameOver) return;

    // Calculate stick angle after release with smoother rotation
    if (state.characterX <= state.platforms[state.currentPlatformIndex].x + state.platforms[state.currentPlatformIndex].width) {
      const platform = state.platforms[state.currentPlatformIndex];
      const progress = (state.characterX - platform.x) / platform.width;
      const targetAngle = -Math.PI/2 * (1 - progress);
      state.stickAngle += (targetAngle - state.stickAngle) * 0.3;
    }

    // Smoother but faster character movement
    const targetX = state.characterX + state.walkingSpeed;
    state.characterX += (targetX - state.characterX) * 0.3;
    
    updateViewport();
    
    // Check if character is walking on the stick
    const currentPlatform = state.platforms[state.currentPlatformIndex];
    if (state.characterX > currentPlatform.x + currentPlatform.width) {
      const distanceOnStick = state.characterX - (currentPlatform.x + currentPlatform.width);
      if (distanceOnStick <= state.stickLength) {
        state.characterY = state.baseHeight - 40 + Math.sin(state.stickAngle) * distanceOnStick;
      }
    }

    drawGame();

    // Check if character reached the end of stick
    if (state.characterX >= currentPlatform.x + currentPlatform.width + state.stickLength) {
      const nextPlatform = state.platforms[state.currentPlatformIndex + 1];
      const stickEndX = currentPlatform.x + currentPlatform.width + state.stickLength;
      const reachedPlatform = stickEndX >= nextPlatform.x && 
                             stickEndX <= nextPlatform.x + nextPlatform.width;

      if (!reachedPlatform) {
        const fallAnimation = () => {
          state.characterY += state.walkingSpeed * 2;
          drawGame();
          if (state.characterY < state.baseHeight + 200) {
            requestAnimationFrame(fallAnimation);
          } else {
            setGameOver(true);
          }
        };
        fallAnimation();
        return;
      }

      // Move to next platform
      if (state.characterX >= nextPlatform.x + 20) {
        state.walking = false;
        state.score += 1;
        setScore(state.score);
        
        // Increase speeds gradually
        state.gameSpeed = Math.min(2, 1 + state.score * 0.05);
        state.stickGrowthSpeed = 2 + state.score * 0.2; // Increase stick growth speed
        state.walkingSpeed = 2 + state.score * 0.2; // Increase walking speed
        
        // Move to next platform
        state.currentPlatformIndex++;
        state.characterX = nextPlatform.x + 50;
        state.characterY = state.baseHeight - 40;
        state.stickLength = 0;
        state.stickAngle = -Math.PI/2;
        
        // Add new platform
        addNewPlatform();
        
        drawGame();
        return;
      }
    }

    state.animationFrame = requestAnimationFrame(moveCharacter);
  };

  const drawCharacter = (ctx, x, y) => {
    ctx.save();
    
    // Body color - dark purple
    ctx.fillStyle = '#4A148C';
    
    // Draw body (slightly taller and slimmer)
    ctx.fillRect(x - 8, y, 16, 25);
    
    // Draw head (circular)
    ctx.beginPath();
    ctx.arc(x, y - 5, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw ninja mask (darker purple)
    ctx.fillStyle = '#311B92';
    ctx.fillRect(x - 8, y - 5, 16, 5);
    
    // Draw ninja band
    ctx.fillStyle = '#00FF00';
    // Band around head
    ctx.fillRect(x - 8, y - 8, 16, 3);
    // Band tails flowing in wind
    ctx.beginPath();
    ctx.moveTo(x + 8, y - 7);
    ctx.quadraticCurveTo(x + 15, y - 7, x + 20, y - 10);
    ctx.lineTo(x + 20, y - 8);
    ctx.quadraticCurveTo(x + 15, y - 5, x + 8, y - 5);
    ctx.fill();
    
    // Draw ninja eyes (glowing green)
    ctx.fillStyle = '#00FF00';
    ctx.beginPath();
    ctx.arc(x - 3, y - 5, 2, 0, Math.PI * 2);
    ctx.arc(x + 3, y - 5, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw sword on back
    ctx.fillStyle = '#B0BEC5';
    // Sword handle
    ctx.fillRect(x - 12, y + 5, 4, 8);
    // Sword blade
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x - 11, y - 5, 2, 10);
    
    // Draw ninja suit details
    ctx.fillStyle = '#00FF00';
    // Belt
    ctx.fillRect(x - 8, y + 10, 16, 2);
    // Arm bands
    ctx.fillRect(x - 8, y + 5, 3, 2);
    ctx.fillRect(x + 5, y + 5, 3, 2);
    
    ctx.restore();
  };

  const drawGame = () => {
    const state = gameStateRef.current;
    const { ctx, baseHeight, characterX, characterY, stickLength, stickAngle, viewportOffset } = state;
    
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.translate(viewportOffset, 0);
    
    drawBackground(ctx);
    
    // Draw platforms with white border
    state.platforms.forEach(platform => {
      if (platform.x + platform.width > -viewportOffset - 100 && 
          platform.x < -viewportOffset + ctx.canvas.width + 100) {
        // Draw white border
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.strokeRect(platform.x, baseHeight, platform.width, 100);
        
        // Fill platform
        ctx.fillStyle = '#000000';
        ctx.fillRect(platform.x, baseHeight, platform.width, 100);
        
        // Draw red markers
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(platform.x, baseHeight, 5, 5);
      }
    });
    
    // Draw stick in white
    if (stickLength > 0) {
      const currentPlatform = state.platforms[state.currentPlatformIndex];
      ctx.save();
      ctx.translate(currentPlatform.x + currentPlatform.width, baseHeight);
      ctx.rotate(stickAngle);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, stickLength, 4);
      ctx.restore();
    }
    
    // Draw character using new function
    drawCharacter(ctx, characterX, characterY);
    
    ctx.restore();
  };

  const initGame = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const state = gameStateRef.current;

    // Set canvas size using vw/vh calculations
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / 100;
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) / 100;
    
    canvas.width = 80 * vw;  // 80vw
    canvas.height = 60 * vh; // 60vh

    state.ctx = ctx;
    state.baseHeight = canvas.height - 100;
    state.characterY = state.baseHeight - 40;
    state.platforms = generateInitialPlatforms();
    state.trees = generateTrees(canvas.width);
    state.backgroundOffset = 0;
    state.stickAngle = -Math.PI/2;
    state.currentPlatformIndex = 0;
    state.gameSpeed = 1;
    state.viewportOffset = 0;
    state.stickGrowthSpeed = 2;
    state.walkingSpeed = state.initialWalkingSpeed;

    state.stickLength = 0;
    state.growing = false;
    state.walking = false;
    state.characterX = 50;
    state.score = 0;
    setScore(0);
    setGameOver(false);

    drawGame();
  };

  const handleInteraction = (start) => {
    const state = gameStateRef.current;
    if (!gameStarted) return; // Don't handle interactions if game hasn't started
    
    if (start && !state.growing && !state.walking && !gameOver) {
      state.growing = true;
      growStick();
    } else if (!start && state.growing) {
      state.growing = false;
      cancelAnimationFrame(state.animationFrame);
      state.walking = true;
      moveCharacter();
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    initGame();
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    const state = gameStateRef.current;
    cancelAnimationFrame(state.animationFrame);
    initGame();
  };

  useEffect(() => {
    initGame();

    const handleMouseDown = (e) => {
      e.preventDefault();
      handleInteraction(true);
    };
    const handleMouseUp = (e) => {
      e.preventDefault();
      handleInteraction(false);
    };
    const handleTouchStart = (e) => {
      e.preventDefault();
      handleInteraction(true);
    };
    const handleTouchEnd = (e) => {
      e.preventDefault();
      handleInteraction(false);
    };

    const preventScroll = (e) => {
      e.preventDefault();
    };

    const canvas = canvasRef.current;
    canvas.addEventListener('touchstart', preventScroll, { passive: false });
    canvas.addEventListener('touchmove', preventScroll, { passive: false });
    canvas.addEventListener('touchend', preventScroll, { passive: false });

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', preventScroll);
      canvas.removeEventListener('touchmove', preventScroll);
      canvas.removeEventListener('touchend', preventScroll);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(gameStateRef.current.animationFrame);
    };
  }, [gameStarted]); // Add gameStarted to dependency array

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full min-h-[100vh] bg-black flex flex-col items-center justify-center py-[10vh] select-none touch-none"
    >
      <div className="text-center mb-[4vh]">
        <h2 className="text-[8vh] font-bold text-white mb-[2vh]">STICK HERO</h2>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="bg-black border-4 border-[#00FF00] rounded-lg touch-none"
        />
        
        {!gameStarted && !gameOver && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={startGame}
              className="px-[4vw] py-[2vh] bg-[#00FF00] text-black font-bold text-[2vh] rounded-lg hover:bg-[#00CC00] transition-colors"
            >
              START GAME
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-[#00FF00] text-[3vh] font-bold mb-[2vh]">Game Over!</div>
            <div className="text-white text-[2.5vh] mb-[2vh]">Score: {score}</div>
            <button
              onClick={resetGame}
              className="px-[4vw] py-[2vh] bg-[#00FF00] text-black font-bold text-[2vh] rounded-lg hover:bg-[#00CC00] transition-colors"
            >
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>

      {gameStarted && !gameOver && (
        <div className="mt-[2vh] text-[#00FF00] text-[2.5vh] font-bold">
          Score: {score}
        </div>
      )}
    </motion.div>
  );
};

export default StickHero;
