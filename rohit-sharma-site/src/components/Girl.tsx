import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import friendPhoto from '../assets/friend-photo.jpg';

interface GirlProps {
  state: 'intro' | 'blown' | 'celebrating';
  isPreparing: boolean;
  isBlowing: boolean;
}

const Girl: React.FC<GirlProps> = ({ state, isPreparing, isBlowing }) => {
  const isSmiling = state === 'blown' || state === 'celebrating';

  return (
    <div className="relative w-80 h-[500px] md:w-[450px] md:h-[650px] flex items-end justify-center perspective-[1500px] overflow-hidden">
      {/* 
         LAYERED PARALLAX CHARACTER 
         We use multiple layers of the same image with different masks and motions
         to create a "living person" effect.
      */}

      {/* 1. BODY LAYER (Shoulders & Chest) */}
      <motion.div
        className="absolute inset-0 z-10 origin-bottom"
        style={{
          maskImage: 'linear-gradient(to top, black 60%, transparent 90%)',
          WebkitMaskImage: 'linear-gradient(to top, black 60%, transparent 90%)',
        }}
        animate={{
          scale: [1, 1.015, 1], // Breathing expansion
          y: [0, -3, 0],
          rotateX: isPreparing || isBlowing ? 10 : [0, 0.5, -0.5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img 
          src={friendPhoto} 
          alt="Body" 
          className="w-full h-full object-contain brightness-105 contrast-[1.01]"
        />
        {/* Soft shadow integration */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40 pointer-events-none" />
      </motion.div>

      {/* 2. HEAD & FACE LAYER (Independent Motion) */}
      <motion.div
        className="absolute inset-0 z-20 origin-center"
        style={{
          maskImage: 'radial-gradient(circle at 50% 30%, black 35%, transparent 65%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 30%, black 35%, transparent 65%)',
        }}
        animate={isPreparing || isBlowing ? { 
          rotateX: 18,
          rotateY: -8,
          z: 80,
          y: 35,
          x: 25,
          scale: 1.08
        } : { 
          rotateY: [0, 5, -5, 0],
          rotateZ: [0, 1.5, -1.5, 0],
          y: [0, -12, 0],
          x: [0, 4, -4, 0]
        }}
        transition={isPreparing || isBlowing 
          ? { duration: 0.9, ease: "circOut" } 
          : { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <img 
          src={friendPhoto} 
          alt="Head" 
          className="w-full h-full object-contain brightness-110 contrast-105"
        />

        {/* INTEGRATED FACE ANIMATIONS */}
        
        {/* Realistic Blink (Layered semi-transparent) */}
        <div className="absolute top-[22%] left-0 w-full h-[15%] pointer-events-none flex justify-center items-center gap-14 md:gap-20">
           <motion.div 
             className="w-12 h-3 bg-[#3a221f]/30 rounded-full blur-[2px]"
             animate={{ scaleY: [0, 1, 0], opacity: [0, 0.5, 0] }}
             transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3.2 }}
           />
           <motion.div 
             className="w-12 h-3 bg-[#3a221f]/30 rounded-full blur-[2px]"
             animate={{ scaleY: [0, 1, 0], opacity: [0, 0.5, 0] }}
             transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3.2 }}
           />
        </div>

        {/* Reaction Glow / Smile Highlight */}
        <AnimatePresence>
          {isSmiling && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              className="absolute inset-0 bg-gradient-to-t from-rose-500/20 via-transparent to-white/15 pointer-events-none mix-blend-color-dodge"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* 3. HAIR MOVEMENT OVERLAY (Parallax highlights) */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none mix-blend-soft-light"
        animate={{
          x: [-5, 5, -5],
          y: [-2, 2, -2],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      >
         <div className="absolute top-[15%] left-[25%] w-[50%] h-[30%] bg-white/20 rounded-full blur-[50px]" />
      </motion.div>

      {/* AMBIENT BLENDING */}
      {/* Background Soft Pink Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-pink-500/10 rounded-full blur-[120px] z-0 pointer-events-none" />
      
      {/* Realistic Floor Shadow */}
      <motion.div 
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[60%] h-10 bg-black/40 rounded-[100%] blur-2xl z-0"
        animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.5, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* CELEBRATORY SPARKS (On her reacting happily) */}
      <AnimatePresence>
        {isSmiling && (
          <motion.div 
            className="absolute inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-yellow-100 rounded-full"
                animate={{
                  y: [0, -250],
                  x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
                  opacity: [0, 1, 0],
                  scale: [0.5, 2, 0.5],
                  rotate: [0, 180]
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${40 + Math.random() * 40}%`,
                  boxShadow: '0 0 10px rgba(255,255,200,0.8)'
                }}
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* BLOWING PARTICLES (High Volume) */}
      <AnimatePresence>
        {isBlowing && (
          <motion.div className="absolute left-[-50px] top-[40%] pointer-events-none z-50">
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-white/40 rounded-full blur-[4px]"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ 
                  x: [0, -450], 
                  y: [0, (Math.random() - 0.5) * 180], 
                  opacity: [0, 1, 0],
                  scale: [1, 6, 1]
                }}
                transition={{ 
                  duration: 0.65, 
                  repeat: Infinity, 
                  delay: i * 0.02,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Girl;
