import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { MusicPlayer } from './MusicPlayer';

interface MenuProps {
  sections: Array<{ id: string; label: string; enLabel: string }>;
  onOpenAdmin?: () => void;
}

export const HeaderMenu: React.FC<MenuProps> = ({ sections, onOpenAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Centered Bar with compact OUR SONG and MENU */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[95] max-w-mobile w-full flex items-center justify-center gap-2 px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2">
          <MusicPlayer />
          <button
            onClick={() => setIsOpen(true)}
            className="px-2.5 py-1 text-[9px] tracking-editorial font-serif uppercase border border-white/20 bg-black/40 backdrop-blur-sm text-white/90 hover:border-white/40 hover:bg-black/60 transition-all rounded-none cursor-pointer"
          >
            MENU
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-canvas-texture bg-cover bg-center text-white flex flex-col justify-between p-8"
          >
            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] tracking-editorial uppercase text-white/70">
                A GARDEN WEDDING
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/80 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            <nav className="my-auto py-4 overflow-y-auto max-h-[68vh] pr-1">
              <ul className="space-y-3.5 text-center">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <button
                      onClick={() => scrollTo(sec.id)}
                      className="group flex flex-col items-center mx-auto"
                    >
                      <span className="font-serif text-xl sm:text-2xl tracking-widest text-white group-hover:text-[#E8D4C8] transition-colors uppercase font-light">
                        {sec.enLabel}
                      </span>
                      <span className="text-[10px] text-white/60 font-light mt-0.5">
                        {sec.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="text-center space-y-2 pb-2">
              <div className="text-[10px] tracking-editorial text-white/50 uppercase">
                SUNGKYU & HYEONJI
              </div>
              {onOpenAdmin && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAdmin();
                  }}
                  className="text-[9px] tracking-widest text-white/40 hover:text-white/80 underline decoration-white/25 underline-offset-4"
                >
                  [관리자] 참석자 명단 확인
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
