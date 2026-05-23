import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CakeProps {
  isCut: boolean;
  extinguishCount: number; // 0 to 3
}

const Cake: React.FC<CakeProps> = ({ isCut, extinguishCount }) => {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
      {/* Magical Sparkles around the cake */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-200 rounded-full blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
      </div>

      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-visible">
        {/* Cake Stand */}
        <path d="M50 170 Q100 180 150 170 L140 185 Q100 195 60 185 Z" fill="#e2e8f0" />
        <path d="M80 185 L120 185 L115 195 L85 195 Z" fill="#cbd5e0" />

        {/* Cake Base Layers */}
        <motion.g
          animate={isCut ? { x: -15, rotate: -2, opacity: 0.9 } : { x: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Bottom Tier */}
          <path d="M40 150 Q40 170 100 170 Q160 170 160 150 L160 110 Q160 130 100 130 Q40 130 40 110 Z" fill="#4a3728" />
          <path d="M40 110 Q40 130 100 130 Q160 130 160 110 Q160 95 100 95 Q40 95 40 110 Z" fill="#5d4037" />
          
          {/* Middle Cream Layer */}
          <path d="M45 125 Q100 135 155 125 L155 120 Q100 130 45 120 Z" fill="#fffdf5" />

          {/* Icing Drips - Detailed */}
          <path d="M40 110 Q45 135 52 120 Q58 145 68 125 Q75 140 85 130 Q92 150 105 132 Q115 145 125 128 Q135 140 145 122 Q155 135 160 110" fill="#fffdf5" />
          
          {/* Sprinkles on top */}
          <g opacity="0.6">
            <circle cx="70" cy="105" r="1.5" fill="#ff69b4" />
            <circle cx="100" cy="110" r="1.5" fill="#7000ff" />
            <circle cx="130" cy="103" r="1.5" fill="#00d2ff" />
            <circle cx="85" cy="115" r="1.5" fill="#fbd38d" />
            <circle cx="115" cy="112" r="1.5" fill="#ff69b4" />
          </g>
        </motion.g>

        {/* Cut Slice */}
        <AnimatePresence>
          {isCut && (
            <motion.g
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.8 }}
              animate={{ x: 35, y: -15, opacity: 1, scale: 1, rotate: 12 }}
              transition={{ duration: 1, delay: 0.1, type: "spring", stiffness: 60 }}
            >
              <path d="M100 110 L140 100 L140 150 L100 165 Z" fill="#5d4037" />
              <path d="M100 110 L140 100 L125 92 L85 102 Z" fill="#fffdf5" />
              <path d="M110 130 Q125 135 140 130" stroke="#fffdf5" strokeWidth="3" fill="none" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Candles */}
        <g transform="translate(0, -5)">
          {[70, 100, 130].map((x, i) => {
            const isExtinguished = extinguishCount > i;
            return (
              <g key={i} transform={`translate(${x}, 92)`}>
                {/* Stick */}
                <rect x="-2.5" y="0" width="5" height="25" fill="#ff69b4" rx="1.5" />
                <rect x="-2.5" y="5" width="5" height="2" fill="white" opacity="0.4" />
                
                {/* Flame */}
                <AnimatePresence>
                  {!isExtinguished && (
                    <motion.g
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0, y: -25 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Inner Glow */}
                      <circle r="12" cy="-8" className="candle-glow" style={{ fill: 'rgba(255, 150, 0, 0.3)' }} />
                      
                      {/* Flame Core */}
                      <motion.path
                        d="M0 -22 Q6 -8 0 0 Q-6 -8 0 -22"
                        fill="url(#flameGradient)"
                        className="flicker"
                      />
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* Smoke when extinguished */}
                <AnimatePresence>
                  {isExtinguished && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.7, 0], y: -50, x: [0, 10, -5] }}
                      transition={{ duration: 2 }}
                    >
                      <circle r="3" cy="-10" fill="rgba(255,255,255,0.3)" />
                      <circle r="4" cy="-18" fill="rgba(255,255,255,0.2)" />
                      <circle r="5" cy="-28" fill="rgba(255,255,255,0.1)" />
                    </motion.g>
                  )}
                </AnimatePresence>
              </g>
            );
          })}
        </g>

        <defs>
          <radialGradient id="flameGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="30%" stopColor="#fffa65" />
            <stop offset="60%" stopColor="#ff9d00" />
            <stop offset="100%" stopColor="#ff4d00" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Cake;
