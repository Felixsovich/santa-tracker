
import React from 'react';
import { motion } from 'framer-motion';

const MagicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#020617]">
      {/* Dynamic Space Nebulas */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-900/30 rounded-full magic-glow"
      ></motion.div>
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, delay: 2 }}
        className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-900/30 rounded-full magic-glow"
      ></motion.div>

      {/* Cosmic Ornaments (Floating space baubles) */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`ornament-${i}`}
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%',
            scale: Math.random() * 0.5 + 0.5 
          }}
          animate={{ 
            y: ['-10%', '110%'],
            rotate: 360,
            x: [ (Math.random() * 10 - 5) + '%', (Math.random() * 10 - 5) + '%']
          }}
          transition={{ 
            duration: Math.random() * 20 + 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className={`absolute w-12 h-12 rounded-full border border-white/20 shadow-lg blur-[0.5px]
            ${i % 3 === 0 ? 'bg-gradient-to-br from-red-500 to-red-900 shadow-red-500/20' : 
              i % 3 === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-600 shadow-yellow-500/20' : 
              'bg-gradient-to-br from-green-500 to-emerald-900 shadow-green-500/20'}`}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-1 h-4 bg-gray-400/40" />
        </motion.div>
      ))}

      {/* Moving Starfield */}
      <div className="absolute inset-0">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: Math.random() }}
            animate={{ 
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{ duration: Math.random() * 5 + 3, repeat: Infinity }}
            className="absolute bg-white rounded-full shadow-[0_0_8px_white]"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Santa Flight Path */}
      <motion.div
        initial={{ x: '-20%', y: '10%', rotate: -10, scale: 0.6 }}
        animate={{ x: '120%', y: '45%', rotate: 10, scale: 1.3 }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute z-10 opacity-70 filter drop-shadow-[0_0_25px_rgba(255,255,255,0.9)]"
      >
        <div className="relative">
          <svg width="180" height="100" viewBox="0 0 120 60" fill="white">
            <path d="M20,45 Q40,55 70,45 T110,45 L115,50 Q80,60 20,50 Z" />
            <path d="M30,45 L35,25 L85,25 L90,45 Z" fill="#ef4444" />
            <circle cx="20" cy="25" r="8" fill="white" />
            <rect x="12" y="30" width="16" height="15" rx="2" fill="#ef4444" />
            <circle cx="110" cy="25" r="2" fill="#ffea00" className="animate-pulse" /> {/* Rudolf's Nose */}
          </svg>
          <motion.div 
            animate={{ opacity: [0, 1, 0], scale: [1, 2, 1] }}
            transition={{ duration: 0.3, repeat: Infinity }}
            className="absolute -left-12 top-1/2 w-24 h-4 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-lg"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default MagicBackground;
