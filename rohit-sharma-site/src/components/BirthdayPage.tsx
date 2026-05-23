import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import EmotionalMessage from './EmotionalMessage';
import CinematicScene from './CinematicScene';
import Girl from './Girl';
import Balloons from './Balloons';
import mainBg from '../assets/birthday-main-bg.jpg';
import profileImg from '../assets/profile.jpg';

const BirthdayPage: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showEmotionalPage, setShowEmotionalPage] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [currentRageMsg, setCurrentRageMsg] = useState("");

  const rageMessages = [
    "wait wait...almost there!",
    "in ond sala press",
    " mathe othu parvagilaa",
    "okay okay last timee!!",
    "Hehehehe , ayth ayth last pakkaa"
  ];

  const handleOpenMessage = () => {
    if (clickCount < rageMessages.length) {
      setCurrentRageMsg(rageMessages[clickCount]);
      setClickCount(prev => prev + 1);
    } else {
      setShowEmotionalPage(true);
    }
  };

  // Generate particles for the birthday screen
  const [particles] = useState(() => [...Array(40)].map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: 35 + Math.random() * 30,
    y: 35 + Math.random() * 30,
    xOffset: (Math.random() - 0.5) * 30,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 5
  })));

  // Generate small floating polaroids
  const [floatingPolaroids] = useState(() => [...Array(6)].map((_, i) => ({
    id: i,
    x: 30 + Math.random() * 40,
    y: 30 + Math.random() * 40,
    rotate: (Math.random() - 0.5) * 40,
    duration: 15 + Math.random() * 10,
    delay: Math.random() * 2
  })));

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] flex items-center justify-center overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {showIntro ? (
          /* PAGE 1: CINEMATIC INTRO */
          <motion.div 
            key="intro-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <CinematicScene onComplete={() => setShowIntro(false)} />
          </motion.div>
        ) : !showEmotionalPage ? (
          /* PAGE 2: HAPPY BIRTHDAY MAIN SCREEN */
          <motion.div 
            key="birthday-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1 }}
            className="relative w-screen h-[100dvh] flex items-center justify-center"
          >
            {/* Background */}
            <img 
              src={mainBg} 
              alt="Birthday Background" 
              className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Atmosphere */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {/* THE GIRL */}
              <motion.div 
                className="absolute left-[-10%] md:left-0 bottom-[-5%] z-20 scale-[0.4] md:scale-[0.55] origin-bottom-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                <Girl state="celebrating" isPreparing={false} isBlowing={false} />
              </motion.div>

              {/* Dust and Sparkles */}
              {particles.map(p => (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full bg-white/40"
                  style={{
                    width: p.size,
                    height: p.size,
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                  }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    y: [0, -40],
                    x: [0, p.xOffset],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                  }}
                />
              ))}

              {/* Floating Polaroids */}
              {floatingPolaroids.map(p => (
                <motion.div
                  key={p.id}
                  className="absolute z-20"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                  }}
                  initial={{ opacity: 0, scale: 0.1, rotate: p.rotate }}
                  animate={{ 
                    opacity: [0, 0.8, 0.8, 0],
                    y: [0, -40, 0],
                    x: [0, 20, 0],
                    rotate: [p.rotate, p.rotate + 15, p.rotate - 15, p.rotate],
                    scale: [0.1, 0.2, 0.1]
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                  }}
                >
                  <div className="bg-white p-2 pb-6 shadow-2xl border border-gray-100 ring-4 ring-black/5">
                    <img 
                      src={profileImg} 
                      alt="Memory" 
                      className="w-24 h-32 object-cover grayscale-[20%]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Content */}
            <div className="relative z-50 flex flex-col items-center justify-center p-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative space-y-8"
              >
                <div className="relative inline-block">
                  <h1 className="flex flex-col items-center">
                    <span className="text-[2.5rem] md:text-[5rem] font-light tracking-[0.2em] text-[#fffdf5] uppercase font-montserrat">
                      HAPPY BIRTHDAY
                    </span>
                    <span className="text-[4.5rem] md:text-[9rem] font-normal text-[#fffdf5] font-caveat -mt-4 md:-mt-8">
                      Chittara
                    </span>
                  </h1>
                </div>

                <div className="flex flex-col items-center gap-12 pt-8">
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleOpenMessage}
                    className="relative group px-12 py-4 bg-white text-black rounded-full text-xl md:text-2xl font-bold tracking-[0.2em] uppercase font-montserrat shadow-xl transition-all duration-500"
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      OPEN <Sparkles className="w-6 h-6 text-black/60" />
                    </span>
                  </motion.button>

                  <div className="h-24 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {currentRageMsg && (
                        <motion.div
                          key={`rage-${clickCount}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="text-[#fffdf5]/90 text-2xl md:text-3xl font-light uppercase tracking-[0.15em] font-montserrat"
                          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                        >
                          {currentRageMsg}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* PAGE 3: EMOTIONAL MESSAGE PAGE */
          <motion.div 
            key="emotional-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative w-screen h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-black"
          >
            {/* 1. SAME BACKGROUND IMAGE */}
            <img 
              src={mainBg} 
              alt="Birthday Background" 
              className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* 2. ATMOSPHERE - Consistent with Page 2 */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {/* THE GIRL STAYS */}
              <motion.div 
                className="absolute left-[-10%] md:left-0 bottom-[-5%] z-20 scale-[0.4] md:scale-[0.55] origin-bottom-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5 }}
              >
                <Girl state="celebrating" isPreparing={false} isBlowing={false} />
              </motion.div>
            </div>
             
             {/* 3. BLURRED MESSAGE RECTANGLE */}
             <div className="relative z-30 w-full flex justify-center px-4">
               <EmotionalMessage />
             </div>

             {/* 4. BALLOONS LAYER (Top level) */}    
             <Balloons />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BirthdayPage;
