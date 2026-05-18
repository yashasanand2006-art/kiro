import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bgPassword from '../assets/bg-password.jpg';
import profileImg from '../assets/profile.jpg';

interface PasswordScreenProps {
  onUnlock: () => void;
}

const PasswordScreen: React.FC<PasswordScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedPassword = password.toLowerCase().trim();

    if (normalizedPassword === 'dummi' || normalizedPassword === 'spidy') {
      onUnlock();
    } else {
      setIsShaking(true);
      const messages = [
        "Wrong password  😭",
        "Nice try adre open agala 😂",
        "Try again, crt password haku 😜",
        "Access Denied! 🛑"
      ];
      setError(messages[Math.floor(Math.random() * messages.length)]);
      setTimeout(() => setIsShaking(false), 500);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Page Background */}
      <div 
        className="absolute inset-0 w-full h-full z-0"
        style={{ 
          backgroundImage: `url(${bgPassword})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>

      {/* Spider-Web Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-1" 
           style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(255,255,255,0.05) 21%, transparent 22%)', backgroundSize: '120px 120px' }}>
      </div>

      <div className="flex flex-col items-center gap-6 z-10 w-full px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/60 text-sm font-black tracking-[0.6em] uppercase italic text-center drop-shadow-lg"
        >
          Access Required
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="rounded-[40px] w-full max-w-[400px] h-[400px] flex flex-col overflow-hidden relative border border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.8)]"
        >
          {/* Full Photo Background of the Square Box */}
          <div className="absolute inset-0 z-0 bg-black flex items-center justify-center">
            <img 
              src={profileImg} 
              alt="Profile" 
              className="w-full h-full object-cover scale-110"
            />
          </div>

          {/* Controls Overlayed at the Bottom */}
          <div className="relative z-10 h-full w-full flex flex-col justify-end p-8 pb-10 bg-gradient-to-t from-black/80 via-transparent to-transparent">
            <div className="w-full space-y-6">
              <form onSubmit={handleSubmit} className="w-full space-y-5">
                <motion.div
                  animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className="relative group"
                >
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="PASSWORD..."
                    className="w-full bg-black/60 backdrop-blur-md border border-white/30 rounded-2xl px-6 py-5 text-white placeholder-white/30 focus:outline-none focus:ring-4 focus:ring-red-600/50 transition-all text-center text-3xl tracking-[0.3em] font-mono group-hover:border-white/50 shadow-2xl"
                    autoFocus
                  />
                  <div className="absolute inset-0 rounded-2xl pointer-events-none group-focus-within:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all"></div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(220, 38, 38, 1)', boxShadow: '0 0 40px rgba(220, 38, 38, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-red-700/90 backdrop-blur-sm text-white font-black py-5 rounded-2xl transition-all shadow-2xl text-2xl uppercase tracking-[0.2em] italic border border-red-500/50"
                >
                  Unlock
                </motion.button>
              </form>

              <div className="h-2">
                <AnimatePresence mode="wait">
                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-red-500 text-center font-black text-[10px] uppercase tracking-[0.2em] drop-shadow-md"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PasswordScreen;
