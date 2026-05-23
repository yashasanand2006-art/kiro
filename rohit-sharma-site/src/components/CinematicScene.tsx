import React, { useState, useCallback, } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import confetti from 'canvas-confetti';
import Cake from './Cake';
import cinematicBg from '../assets/cinematic-bg.jpg';
import bdyVideo from '../assets/bdy-video.mp4';
import bdyVideo2 from '../assets/bdy-video-2.mp4';
import bdyVideo3 from '../assets/bdy-video-3.mp4';
import '../styles/Cinematic.css';

interface CinematicSceneProps {
  onComplete: () => void;
}

type SceneState = 'intro' | 'blown' | 'celebrating' | 'final';

const CinematicScene: React.FC<CinematicSceneProps> = ({ onComplete }) => {
  const [state, setState] = useState<SceneState>('intro');
  const [isPreparing, setIsPreparing] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);
  const [extinguishCount, setExtinguishCount] = useState(0);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const controls = useDragControls();

  const triggerBlowingSequence = useCallback(async () => {
    // Phase 1: Prepare (Leaning in, cheeks puffing)
    setIsPreparing(true);
    await new Promise(resolve => setTimeout(resolve, 100)); // Even faster start
    
    // Phase 2: Blowing (Air particles appear)
    setIsPreparing(false);
    setIsBlowing(true);
    
    // Phase 3: Sequential Candle Extinguishing
    for (let i = 1; i <= 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 600)); // Slower extinguishing
      setExtinguishCount(i);
    }
    
    await new Promise(resolve => setTimeout(resolve, 400));
    setIsBlowing(false);
    setState('blown');
  }, []);

  const triggerCelebration = useCallback(() => {
    setState('celebrating');
    // Big celebratory burst
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fffdf5', '#ff1a75', '#7000ff']
    });
  }, []);

  const handleDrag = (_: any, info: any) => {
    const progress = Math.min(Math.abs(info.offset.x) / 180, 1);
    setSwipeProgress(progress);
  };

  const handleDragEnd = (_: any, info: any) => {
    if (Math.abs(info.offset.x) > 130) {
      if (state === 'intro' && !isPreparing && !isBlowing) {
        triggerBlowingSequence();
      } else if (state === 'blown') {
        triggerCelebration();
      } else if (state === 'celebrating') {
        onComplete();
      }
    }
    setSwipeProgress(0);
  };

  const getInstruction = () => {
    if (isPreparing || isBlowing) return "bega ond wish madko pat anta";
    if (state === 'intro') return "Swipe to blow the candles";
    if (state === 'blown') return "Swipe to cut the cake";
    if (state === 'celebrating') return "Swipe to see more!";
    return "";
  };

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] z-[100] flex flex-col items-center justify-center overflow-hidden">
      {/* 0. CUSTOM BACKGROUND IMAGE - ABSOLUTE FULL SCREEN */}
      <img 
        src={cinematicBg} 
        alt="Cinematic Background" 
        className="absolute inset-0 w-full h-full object-cover z-0" 
      />

      {/* 1. ATMOSPHERIC BACKGROUND EFFECTS - VERY MINIMAL */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Floating Particles/Stars */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0.5, 1, 0.5],
              y: [0, -100]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 w-[95%] h-[70%] max-w-6xl flex flex-col items-center justify-center -translate-x-[5%] md:-translate-x-[10%]">
        {/* CAMERA VIEW ZONE - Viewfinder Corners */}
        <div className="absolute inset-0 pointer-events-none z-30">
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/30" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-white/30" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-white/30" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/30" />
        </div>

        {/* INNER CAMERA SCREEN AREA - Elements stay inside here */}
        <div className="w-full flex flex-row items-center justify-center gap-0 md:gap-4 transition-all duration-500">
          
          {/* LEFT SIDE: VIDEO 1 (Default) or VIDEO 2 (Blowing) or VIDEO 3 (Celebrating) */}
          <div className={`relative z-10 flex-shrink-0 flex items-center justify-center w-[250px] h-[350px] sm:w-[300px] sm:h-[400px] md:w-[400px] md:h-[550px] transition-transform duration-700 ${
            state === 'celebrating' ? 'translate-x-[110px] md:translate-x-[240px]' : 'translate-x-[30px] md:translate-x-[80px]'
          }`}>
            <AnimatePresence>
              {(isPreparing || isBlowing) ? (
                <motion.div
                  key="video2"
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.9, transition: { duration: 0.3 } }}
                  className="w-[190px] h-[260px] sm:w-[230px] sm:h-[320px] md:w-[300px] md:h-[420px] rounded-[60px] overflow-hidden flex items-center justify-center"
                >
                  <video 
                    src={bdyVideo2} 
                    autoPlay 
                    muted 
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {/* BLOWING PARTICLES */}
                  <AnimatePresence>
                    {isBlowing && (
                      <motion.div className="absolute left-[20%] top-[40%] pointer-events-none z-50">
                        {[...Array(25)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-4 h-4 bg-white/40 rounded-full blur-[4px]"
                            initial={{ x: 0, y: 0, opacity: 0 }}
                            animate={{ 
                              x: [0, 450], 
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
                </motion.div>
              ) : state === 'celebrating' ? (
                <motion.div
                  key="video3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                  className="w-[190px] h-[260px] sm:w-[230px] sm:h-[320px] md:w-[300px] md:h-[420px] rounded-[60px] overflow-hidden flex items-center justify-center"
                >
                  <video 
                    src={bdyVideo3} 
                    autoPlay 
                    loop
                    muted 
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="video1"
                  initial={{ opacity: 0, x: -80, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -80, scale: 0.9, transition: { duration: 0.3 } }}
                  className="w-[190px] h-[260px] sm:w-[230px] sm:h-[320px] md:w-[300px] md:h-[420px] rounded-[60px] overflow-hidden flex items-center justify-center"
                >
                  <video 
                    src={bdyVideo} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE: THE CAKE */}
          <motion.div 
            className="relative z-10 flex flex-col items-center flex-shrink-0 scale-[0.6] sm:scale-[0.7] md:scale-[0.9] origin-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: state === 'intro' ? -15 : -35 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Cake 
              isCut={state === 'celebrating'} 
              extinguishCount={extinguishCount}
            />
          </motion.div>
        </div>

        {/* INTERACTION UI - NOW BIGGER AND JUST BELOW GIRL & CAKE */}
        <AnimatePresence>
          {state !== 'final' && (
            <motion.div
              drag="x"
              dragControls={controls}
              dragConstraints={{ left: 0, right: 0 }}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              className="mt-1 cursor-grab active:cursor-grabbing touch-none relative z-30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: -60 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="glass-card px-10 py-6 rounded-2xl flex flex-col items-center gap-4 border border-white/10 min-w-[300px] md:min-w-[400px] shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-5">
                  <span className="text-white font-montserrat tracking-[0.15em] uppercase text-sm md:text-base lg:text-lg font-bold text-center">
                    {getInstruction()}
                  </span>
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-pink-400 text-lg"
                  >
                    →
                  </motion.div>
                </div>
                
                {/* Progress Bar - Larger */}
                <div className="w-full h-[5px] bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-purple-600"
                    animate={{ width: `${swipeProgress * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. CELEBRATION OVERLAY */}
      <AnimatePresence>
        {state === 'celebrating' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[6px] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CinematicScene;
