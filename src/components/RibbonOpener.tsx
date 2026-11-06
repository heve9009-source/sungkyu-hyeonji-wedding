import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RibbonOpenerProps {
  onOpen?: () => void;
}

export const RibbonOpener: React.FC<RibbonOpenerProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    if (onOpen) {
      onOpen();
    }
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="wax-wrapper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, delay: 1.8 }}
          className="fixed inset-0 z-[200] max-w-mobile mx-auto flex flex-col justify-center items-center overflow-hidden cursor-pointer select-none"
          onClick={handleOpen}
        >
          {/* Left Paper Flap */}
          <motion.div
            exit={{ x: '-100%' }}
            transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
            className="absolute top-0 bottom-0 left-0 w-[50.5%] bg-ivory border-r border-deep-green/10 shadow-2xl flex flex-col justify-center items-end pr-0 z-10"
            style={{
              backgroundImage: `radial-gradient(circle at 100% 50%, rgba(36, 56, 44, 0.03) 0%, transparent 70%)`
            }}
          >
            {/* Natural Beige Linen & Sage Strap (Left) */}
            <motion.div
              exit={{ opacity: 0, filter: 'blur(8px)', scale: 1.05 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="w-full h-8 sm:h-9 bg-[#E3DAC2]/75 border-y border-[#C5BA9E]/80 shadow-sm relative flex flex-col justify-between py-1"
            >
              <div className="w-full h-[1px] bg-white/60" />
              <div className="w-full h-[1.5px] bg-[#96BD88]/80" />
            </motion.div>
          </motion.div>

          {/* Right Paper Flap */}
          <motion.div
            exit={{ x: '100%' }}
            transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
            className="absolute top-0 bottom-0 right-0 w-[50.5%] bg-ivory border-l border-deep-green/10 shadow-2xl flex flex-col justify-center items-start pl-0 z-10"
            style={{
              backgroundImage: `radial-gradient(circle at 0% 50%, rgba(36, 56, 44, 0.03) 0%, transparent 70%)`
            }}
          >
            {/* Natural Beige Linen & Sage Strap (Right) */}
            <motion.div
              exit={{ opacity: 0, filter: 'blur(8px)', scale: 1.05 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="w-full h-8 sm:h-9 bg-[#E3DAC2]/75 border-y border-[#C5BA9E]/80 shadow-sm relative flex flex-col justify-between py-1"
            >
              <div className="w-full h-[1px] bg-white/60" />
              <div className="w-full h-[1.5px] bg-[#96BD88]/80" />
            </motion.div>
          </motion.div>

          {/* Effect C: Central Translucent Green Wax Seal - Cinematic Soft Dissolve & Reveal */}
          <motion.div
            initial={{ opacity: 1, x: '-50%', y: '-50%', scale: 1 }}
            animate={{ opacity: 1, x: '-50%', y: '-50%', scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)', x: '-50%', y: '-50%' }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 z-30 flex flex-col items-center justify-center pointer-events-auto w-full max-w-[280px] sm:max-w-[320px]"
          >
            {/* Translucent Pale Green Wax Seal Button (#DCEDC8) */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center filter drop-shadow-2xl backdrop-blur-[2px]">
              {/* Outer Melted Translucent Green Wax Edge */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#EEF7E4]/95 via-[#DCEDC8]/90 to-[#BBDCA6]/90 border border-white/70 shadow-2xl flex items-center justify-center p-2 transform rotate-6">
                
                {/* Inner Pressed Seal Groove */}
                <div className="w-full h-full rounded-full border border-[#94B885]/60 bg-gradient-to-br from-[#E2F0D5]/90 to-[#C6E4B6]/90 flex flex-col items-center justify-center relative shadow-inner">
                  
                  {/* Botanical Olive Branch Stamp in Deep Green Accent */}
                  <svg
                    viewBox="0 0 100 100"
                    className="w-16 h-16 text-deep-green transform -rotate-12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Stem */}
                    <path
                      d="M25 75 C40 60 55 40 75 25"
                      stroke="#24382C"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Leaf Pairs */}
                    <path d="M35 65 C28 58 28 48 38 52 C42 58 40 64 35 65 Z" fill="#24382C" />
                    <path d="M42 58 C48 50 58 52 54 60 C48 64 43 62 42 58 Z" fill="#24382C" />
                    
                    <path d="M48 50 C40 42 42 32 50 36 C55 42 53 48 48 50 Z" fill="#24382C" />
                    <path d="M56 42 C62 34 72 38 68 45 C62 50 57 46 56 42 Z" fill="#24382C" />

                    <path d="M62 34 C58 24 64 18 70 24 C72 30 68 34 62 34 Z" fill="#24382C" />
                    <path d="M72 26 C78 18 84 22 80 28 C76 32 73 30 72 26 Z" fill="#24382C" />

                    {/* Small Decorative Accent */}
                    <circle cx="78" cy="22" r="2.5" fill="#5A432D" />
                  </svg>

                  {/* Wax Seal Text Ring */}
                  <span className="font-serif text-[7px] tracking-[0.25em] uppercase text-deep-green/80 absolute bottom-3.5 font-medium">
                    GARDEN WEDDING
                  </span>
                </div>
              </div>
            </div>

            {/* Click Hint Text */}
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="mt-6 text-center space-y-1"
            >
              <span className="font-serif text-[11px] tracking-[0.3em] uppercase text-deep-green font-medium block">
                TAP SEAL TO OPEN
              </span>
              <span className="font-serif text-[9px] tracking-editorial text-olive/80 uppercase block">
                실링 왁스를 눌러 청첩장을 열어보세요
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
