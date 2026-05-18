import React, { useState } from 'react';
import { motion } from 'framer-motion';

const COLORS = [
  '#E62429', // Spider-Man Red
  '#005A9C', // Royal Blue
  '#FFFFFF', // White
  '#FF1A75', // Vibrant Pink
];

const Balloon: React.FC<{ side: 'left' | 'right' }> = ({ side }) => {
  const [data] = useState(() => ({
    duration: Math.random() * 4 + 7, // 7s to 11s
    delay: Math.random() * 8 - 8, // Some already on screen
    swayAmount: Math.random() * 10 + 10,
    swayDuration: Math.random() * 2 + 3,
    size: Math.random() * 20 + 50, // Smaller size: 50px to 70px
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    leftOffset: Math.random() * 12, // Offset within its side strip
  }));

  return (
    <motion.div
      initial={{ y: '110vh' }}
      animate={{ y: '-30vh' }}
      transition={{
        duration: data.duration,
        repeat: Infinity,
        delay: data.delay,
        ease: "linear"
      }}
      className="fixed top-0"
      style={{
        [side]: `${2 + data.leftOffset}%`, // Positioned within side zones
        width: data.size,
        height: '100vh',
        zIndex: 110,
        pointerEvents: 'none'
      }}
    >
      <motion.div
        animate={{
          x: [-data.swayAmount, data.swayAmount, -data.swayAmount],
          rotate: [-6, 6, -6]
        }}
        transition={{
          duration: data.swayDuration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex flex-col items-center"
      >
        {/* Balloon Body */}
        <div
          className="rounded-[50%_50%_50%_50%/45%_45%_55%_55%] relative"
          style={{
            width: data.size,
            height: data.size * 1.3,
            backgroundColor: data.color,
            boxShadow: `inset -6px -10px 20px rgba(0,0,0,0.4), 0 10px 20px rgba(0,0,0,0.3)`,
            border: `1px solid rgba(255,255,255,0.1)`,
            opacity: 0.95
          }}
        >
          {/* Glossy Highlight */}
          <div className="absolute top-[15%] left-[15%] w-[25%] h-[15%] bg-white/40 rounded-[50%] rotate-[-30deg]" />
        </div>

        {/* Balloon Knot */}
        <div 
          className="w-[18%] h-[8px] mt-[-2px] z-10"
          style={{ 
            backgroundColor: data.color,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
        />

        {/* Balloon String */}
        <div className="w-[1px] h-[60vh] bg-white/30 mt-[-1px]" />
      </motion.div>
    </motion.div>
  );
};

const Balloons: React.FC = () => {
  return (
    <>
      {/* 6 Balloons on Left */}
      {[...Array(6)].map((_, i) => (
        <Balloon key={`left-${i}`} side="left" />
      ))}
      {/* 6 Balloons on Right */}
      {[...Array(6)].map((_, i) => (
        <Balloon key={`right-${i}`} side="right" />
      ))}
    </>
  );
};

export default Balloons;
