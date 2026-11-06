import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: Array<{ id: number; src: string; alt: string }>;
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  if (currentIndex === null || !images[currentIndex]) return null;

  const currentImage = images[currentIndex];

  const handlePrev = () => {
    const nextIndex = (currentIndex - 1 + images.length) % images.length;
    onNavigate(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    onNavigate(nextIndex);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 flex flex-col justify-between p-4"
        onClick={onClose}
      >
        {/* Top bar: counter & close */}
        <div className="flex justify-between items-center text-ivory text-xs tracking-widest font-serif pt-2 px-2" onClick={(e) => e.stopPropagation()}>
          <span>{currentIndex + 1} / {images.length}</span>
          <button onClick={onClose} className="p-2 hover:text-champagne transition-colors" aria-label="Close lightbox">
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>

        {/* Center image container */}
        <div className="relative flex-1 flex items-center justify-center my-auto overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <motion.img
            key={currentImage.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-h-[80vh] max-w-full object-contain"
          />

          {/* Navigation arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 p-3 text-ivory/70 hover:text-ivory bg-black/30 backdrop-blur-sm rounded-none border border-ivory/20"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 p-3 text-ivory/70 hover:text-ivory bg-black/30 backdrop-blur-sm rounded-none border border-ivory/20"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Caption */}
        <div className="text-center text-ivory/60 text-xs font-serif pb-4 tracking-widest uppercase" onClick={(e) => e.stopPropagation()}>
          {currentImage.alt}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
