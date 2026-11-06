import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WeddingData } from '../../data/wedding';

interface DetailsProps {
  data: WeddingData;
}

export const TheDetailsSection: React.FC<DetailsProps> = ({ data }) => {
  const snaps = data.weddingSnaps || [
    {
      id: 1,
      src: data.images.detailShoes,
      alt: "Wedding Snap 1",
      caption: "IN THE QUIET GARDEN",
      note: "EACH SESSION AND EXPERIENCE IS CRAFTED TO GIVE YOU SPACE TO BE FULLY PRESENT.",
      tag: "couples"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? snaps.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection(1);
    setCurrentIndex((prev) => (prev === snaps.length - 1 ? 0 : prev + 1));
  };

  const currentSnap = snaps[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 350, damping: 32 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 350, damping: 32 },
        opacity: { duration: 0.25 }
      }
    })
  };

  return (
    <section id="details" className="py-24 px-3 sm:px-5 bg-[#465F4C] text-white relative overflow-hidden">
      {/* Editorial Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-2 mb-8"
      >
        <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
          CHAPTER II · SNAP JOURNAL
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl tracking-widest text-white uppercase font-light">
          THE DETAILS
        </h2>
        <p className="font-serifkr text-xs text-white/70 font-light">
          수첩 속 소중히 간직한 우리들의 웨딩 스냅
        </p>
      </motion.div>

      {/* Exact Journal Notebook Replica Frame Container */}
      <div className="relative w-full max-w-[390px] mx-auto select-none">
        
        {/* Aspect Ratio Box matching exact 450x612 journal template */}
        <div className="relative w-full aspect-[450/612] drop-shadow-[0_16px_36px_rgba(0,0,0,0.35)]">
          
          {/* Layer 1: Inner Photo Slider Window (Positioned exactly inside the embossed floral frame) */}
          <div
            className="absolute z-10 overflow-hidden bg-[#242220] cursor-pointer"
            style={{
              left: '31.11%',
              top: '33.01%',
              width: '35.56%',
              height: '31.21%',
            }}
            onClick={() => handleNext()}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={currentSnap.id}
                src={currentSnap.src}
                alt={currentSnap.alt}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full object-cover select-none"
                loading="lazy"
                draggable={false}
              />
            </AnimatePresence>

            {/* Subtle Inner Shadow overlay on photo */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_2px_8px_rgba(0,0,0,0.35)]" />
          </div>

          {/* Layer 2: Exact Journal Frame Artwork (Template PNG with transparent cutout window) */}
          <img
            src="/images/journal_frame.png"
            alt="Wedding Journal Notebook Frame"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20"
            draggable={false}
          />

          {/* Layer 3: Interactive Left & Right Navigation Arrows (Subtle Ghost buttons) */}
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute z-30 top-[48.5%] -translate-y-1/2 left-2 sm:left-3 w-8 h-8 rounded-full bg-black/35 border border-white/20 backdrop-blur-sm shadow-sm flex items-center justify-center text-white/80 hover:bg-black/55 hover:text-white active:scale-95 transition-all"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute z-30 top-[48.5%] -translate-y-1/2 right-2 sm:right-3 w-8 h-8 rounded-full bg-black/35 border border-white/20 backdrop-blur-sm shadow-sm flex items-center justify-center text-white/80 hover:bg-black/55 hover:text-white active:scale-95 transition-all"
            aria-label="Next photo"
          >
            <ChevronRight className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Bottom Page Counter & Dots for Smooth Navigation */}
        <div className="flex flex-col items-center justify-center gap-2.5 mt-5">
          {/* Counter Text */}
          <div className="flex items-center gap-3 text-[10px] font-serif tracking-widest text-white/70 uppercase">
            <span>{currentSnap.caption}</span>
            <span className="w-3 h-[1px] bg-white/30" />
            <span className="font-medium text-white">
              {String(currentIndex + 1).padStart(2, '0')} / {String(snaps.length).padStart(2, '0')}
            </span>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center items-center gap-1.5">
            {snaps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`transition-all rounded-full ${
                  idx === currentIndex
                    ? 'w-4 h-1 bg-white'
                    : 'w-1 h-1 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
