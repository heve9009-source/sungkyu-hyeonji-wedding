import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeOpenerProps {
  onOpen?: () => void;
}

export const EnvelopeOpener: React.FC<EnvelopeOpenerProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('opened') === 'true';
    }
    return false;
  });

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
          key="envelope-opener-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
          className="fixed inset-0 z-[200] max-w-mobile mx-auto flex flex-col justify-center items-center overflow-hidden cursor-pointer select-none bg-black"
          onClick={handleOpen}
        >
          {/* Fullscreen Atmospheric Background Wedding Photo */}
          <motion.div
            initial={{ scale: 1 }}
            exit={{ scale: 1.08, filter: 'blur(8px)' }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src="/images/envelope_cover.jpg"
              alt="Romantic Outdoor Wedding Envelope"
              className="w-full h-full object-cover object-center select-none"
              draggable={false}
            />
            {/* Soft Ambient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none" />
          </motion.div>

          {/* Couple Title: SungKyu ♥ HyeonJi (Locked Exactly at Horizontal Center Above Envelope) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="absolute inset-x-0 z-30 flex flex-col items-center justify-center text-center pointer-events-none px-4"
            style={{
              top: '26%',
            }}
          >
            <h1
              className="font-continuous text-xl sm:text-2xl text-white/95 tracking-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)] flex items-center justify-center gap-2 font-normal"
              style={{
                fontFamily: "'Continuous', cursive, sans-serif",
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
              }}
            >
              <span>SungKyu</span>
              <span className="text-[#E8D4C8] text-xs sm:text-sm font-sans not-italic drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">♥</span>
              <span>HyeonJi</span>
            </h1>
            <span className="block font-serif italic text-[11px] sm:text-xs tracking-[0.2em] text-white/85 mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] font-light lowercase">
              with love.
            </span>
          </motion.div>

          {/* Envelope Center Opening Seal - Fine-tuned: top 47.5%, smaller delicate circle */}
          <div
            className="absolute pointer-events-none z-30"
            style={{
              left: '51.2%',
              top: '47.5%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              {/* Soft Translucent Ripple Wave 1 (Compact & Subtle) */}
              <span className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-35 duration-1000" />

              {/* Soft Translucent Glow Halo 2 */}
              <span className="absolute -inset-1 rounded-full border border-white/15 animate-pulse" />

              {/* Delicate Smaller Translucent Ring Around the Flower Seal */}
              <div className="relative w-6 h-6 rounded-full border border-white/45 shadow-[0_0_8px_rgba(255,255,255,0.35),inset_0_0_3px_rgba(255,255,255,0.25)] flex items-center justify-center bg-white/10 backdrop-blur-[1px]">
                {/* Subtle Breathing Core Dot */}
                <div className="w-1 h-1 rounded-full bg-white/70 shadow-[0_0_3px_#ffffff] animate-ping" />
              </div>
            </div>
          </div>

          {/* Full Envelope Interactive Tap Area */}
          <div
            className="absolute z-20 cursor-pointer"
            style={{
              left: '51.2%',
              top: '47.5%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxWidth: '340px',
              aspectRatio: '1.4 / 1',
            }}
            onClick={handleOpen}
            aria-label="Open Invitation Envelope"
          />

          {/* Bottom Romantic Guidance Hint */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="absolute bottom-10 z-30 text-center space-y-1.5 px-6 pointer-events-none"
          >
            <span className="font-serif text-[11px] tracking-[0.35em] uppercase text-white/95 font-medium block drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              TAP SEAL TO OPEN
            </span>
            <span className="font-serif text-[10px] tracking-editorial text-white/80 uppercase block drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-light">
              편지 가운데 꽃 도장을 눌러보세요
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
