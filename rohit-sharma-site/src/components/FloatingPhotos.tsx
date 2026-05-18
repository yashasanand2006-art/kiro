import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../assets/profile.jpg';

const FloatingPhotos: React.FC = () => {
  const photoUrl = profileImg;

  const [photos] = React.useState(() => [...Array(8)].map((_, index) => ({
    id: index,
    // Restrict to center area
    x: 25 + Math.random() * 50, // 25% to 75%
    y: 20 + Math.random() * 60, // 20% to 80%
    rotate: (Math.random() - 0.5) * 30,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10
  })));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
      {photos.map((photo) => (
        <motion.div
          key={photo.id}
          className="absolute"
          style={{
            left: `${photo.x}%`,
            top: `${photo.y}%`,
          }}
          initial={{ opacity: 0, scale: 0.2, rotate: photo.rotate }}
          animate={{ 
            opacity: [0, 0.6, 0.6, 0],
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [photo.rotate, photo.rotate + 10, photo.rotate - 10, photo.rotate],
            scale: [0.4, 0.45, 0.4]
          }}
          transition={{
            duration: photo.duration,
            repeat: Infinity,
            delay: photo.delay,
            ease: "easeInOut"
          }}
        >
          <div className="bg-white p-2 pb-6 shadow-2xl border border-gray-200">
            <img 
              src={photoUrl} 
              alt="Memory" 
              className="w-24 h-32 object-cover grayscale-[10%]"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingPhotos;
