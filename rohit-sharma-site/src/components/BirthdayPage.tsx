import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import EmotionalMessage from './EmotionalMessage';
import Balloons from './Balloons';
import birthdayBg from '../assets/bg-birthday.jpg';
import profileImg from '../assets/profile.jpg';

const BirthdayPage: React.FC = () => {
  const [isMuted] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showRealMessage, setShowRealMessage] = useState(false);
  const [rageMsg, setRageMsg] = useState("");

  const rageMessages = [
    "wait wait...almost there!",
    "in ond sala press",
    " mathe othu parvagilaa",
    "okay okay last timee!!",
    "Hehehehe , ayth ayth last pakkaa"
  ];

  const handleOpenMessage = () => {
    if (clickCount < rageMessages.length) {
      setRageMsg(rageMessages[clickCount]);
      setClickCount(prev => prev + 1);
    } else {
      setShowRealMessage(true);
    }
  };

  // Generate particles only for the center frame area
  const [particles] = useState(() => [...Array(40)].map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: 35 + Math.random() * 30, // Keep in center (35% to 65%)
    y: 35 + Math.random() * 30, // Keep in center (35% to 65%)
    xOffset: (Math.random() - 0.5) * 30,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 5
  })));

  // Generate small floating polaroids for the center area
  const [floatingPolaroids] = useState(() => [...Array(6)].map((_, i) => ({
    id: i,
    x: 30 + Math.random() * 40, // 30% to 70%
    y: 30 + Math.random() * 40, // 30% to 70%
    rotate: (Math.random() - 0.5) * 40,
    duration: 15 + Math.random() * 10,
    delay: Math.random() * 2
  })));

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden">
      {/* 1. ABSOLUTE BACKGROUND IMAGE */}
      <img 
        src={birthdayBg} 
        alt="Birthday Collage" 
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 1 }}
      />

      {/* 2. ATMOSPHERIC LAYER (Subtle overlays) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Soft Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        
        {/* Dust and Sparkles (Soft white/cream) */}
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/40 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
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
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Small Floating Polaroids inside the center area */}
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
              ease: "easeInOut"
            }}
          >
            <div className="bg-white p-2 pb-6 shadow-2xl border border-gray-100 ring-4 ring-black/5 transform">
              <img 
                src={profileImg} 
                alt="Memory" 
                className="w-24 h-32 object-cover grayscale-[20%]"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4. MAIN CONTENT (HAPPY BIRTHDAY) */}
      <div className="relative z-50 w-full flex flex-col items-center justify-center p-6 text-center">
        {!showRealMessage ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative space-y-8"
            >
              <div className="relative inline-block">
                <h1 className="flex flex-col items-center">
                  <span 
                    className="text-[2.5rem] md:text-[5rem] font-light tracking-[0.2em] text-[#fffdf5] uppercase font-montserrat"
                    style={{
                      textShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    }}
                  >
                    HAPPY BIRTHDAY
                  </span>
                  <span 
                    className="text-[4.5rem] md:text-[9rem] font-normal text-[#fffdf5] font-caveat -mt-4 md:-mt-8"
                    style={{
                      textShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    }}
                  >
                    Chittara
                  </span>
                </h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1.5 }}
                  className="text-[1.2rem] md:text-[1.8rem] font-light text-[#fffdf5]/80 font-caveat tracking-wide mt-2"
                >
                
                </motion.p>
              </div>

              <div className="flex flex-col items-center gap-12 pt-8">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 1 }}
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
                    {rageMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-[#fffdf5]/90 text-2xl md:text-3xl font-light uppercase tracking-[0.15em] font-montserrat"
                        style={{
                          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        }}
                      >
                        {rageMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <div className="w-full flex justify-center py-10">
            <EmotionalMessage />
          </div>
        )}
      </div>

      {/* AUDIO */}
      <audio 
        src="/birthday-song.mp3" 
        autoPlay 
        loop 
        muted={isMuted}
      />

      {/* 5. BALLOONS LAYER (Top level) */}
      {showRealMessage && <Balloons />}
    </div>
  );
};

export default BirthdayPage;
