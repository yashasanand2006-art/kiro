import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Stars } from 'lucide-react';

const EmotionalMessage: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  
  const [hearts] = useState(() => [...Array(5)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 5 + 3
  })));

  const message = `Tooo, Chittaraaaaaaaa

Happy Birthdayyy! 🎂 
Happy 20!. 

May your day be good!!!
enjoy it to the fullest!!
 ✨`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(message.slice(0, i));
      i++;
      if (i > message.length) clearInterval(interval);
    }, 50);

    // Initial Confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fffdf5', '#ff1a75', '#7000ff']
    });

    return () => clearInterval(interval);
  }, [message]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-morphism p-8 md:p-12 rounded-[40px] max-w-2xl w-full mx-4 relative overflow-hidden min-h-[400px] flex flex-col justify-center"
      style={{ zIndex: 10 }}
    >
      <div className="absolute top-0 right-0 p-4 opacity-20">
        <Stars className="w-20 h-20 text-yellow-400" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="space-y-10 text-center w-full">
          <p className="text-xl md:text-3xl text-[#fffdf5]/95 leading-relaxed font-light font-montserrat tracking-wide whitespace-pre-wrap">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-0.5 h-8 bg-[#fffdf5]/50 ml-1 align-middle"
            />
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5 }}
            className="mt-10 flex justify-center"
          >
            <button
              onClick={() => confetti({ particleCount: 100, spread: 60, colors: ['#fffdf5', '#ff1a75', '#7000ff'] })}
              className="px-8 py-2.5 rounded-full bg-white text-black font-montserrat text-sm font-bold tracking-widest uppercase hover:bg-white/90 shadow-lg transition-all"
            >
              More Confetti! 🎊
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Hearts Decoration */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-pink-500/20"
          style={{
            left: `${h.left}%`,
            top: `${h.top}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 20, 0],
            rotate: [0, 45, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Heart className="w-12 h-12 fill-current" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default EmotionalMessage;
