import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WeddingData } from '../../data/wedding';

interface TimelineProps {
  data: WeddingData;
}

export const TimelineSection: React.FC<TimelineProps> = ({ data }) => {
  const photos = data.timelinePhotos && data.timelinePhotos.length > 0
    ? data.timelinePhotos
    : [
        { id: 1, src: '/images/timeline/photo1.jpg', alt: '추억 1' },
        { id: 2, src: '/images/timeline/photo2.jpg', alt: '추억 2' },
        { id: 3, src: '/images/timeline/photo3.jpg', alt: '추억 3' },
        { id: 4, src: '/images/timeline/photo4.jpg', alt: '추억 4' },
        { id: 5, src: '/images/timeline/photo5.jpg', alt: '추억 5' },
        { id: 6, src: '/images/timeline/photo6.jpg', alt: '추억 6' },
      ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Automatic slide interval: 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(timer);
  }, [handleNext]);

  const currentPhoto = photos[currentIndex];

  return (
    <section id="timeline" className="py-24 px-4 sm:px-6 bg-transparent text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto space-y-8"
      >
        {/* Section Header */}
        <div className="text-center space-y-2">
          <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
            SUNGKYU &amp; HYEONJI · MEMORIES
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-widest text-white uppercase font-light">
            우리의 타임라인
          </h2>
          <p className="font-serif text-xs text-white/70 font-light">
            서로를 만나 함께 걸어온 소중한 시간들
          </p>
        </div>

        {/* Clover Divider */}
        <div className="flex items-center justify-center gap-3">
          <span className="w-10 h-[1px] bg-white/25" />
          <span className="text-[11px] text-white/50 tracking-widest font-light">✤</span>
          <span className="w-10 h-[1px] bg-white/25" />
        </div>

        {/* Binder / Clipboard Container */}
        <div className="relative flex flex-col items-center justify-center pt-2">
          {/* Main Clipboard Body */}
          <div
            onClick={handleNext}
            className="relative w-full max-w-[320px] sm:max-w-[350px] aspect-[1/1.55] bg-[#FAF9F5] rounded-[22px] border border-black/10 shadow-[0_20px_45px_rgba(0,0,0,0.55)] p-4 sm:p-5 flex flex-col items-center justify-between cursor-pointer select-none group transition-transform duration-300 active:scale-[0.99]"
          >
            {/* Top Metal Clip Clamp (Authentic Photo Asset) */}
            <div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 w-[84%] max-w-[280px] z-30 pointer-events-none">
              <img
                src="/images/timeline_clipboard_clip.png"
                alt="Binder Clip"
                className="w-full h-auto drop-shadow-[0_6px_12px_rgba(0,0,0,0.3)]"
              />
            </div>

            {/* Top spacing spacer so photo starts tucked under the clamp */}
            <div className="h-10 sm:h-12 w-full flex-shrink-0" />

            {/* Inner Photo Frame (tucked under clip, centered on white paper) */}
            <div className="relative w-full flex-1 rounded-[4px] overflow-hidden bg-stone-900 shadow-inner border border-black/5 min-h-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentPhoto.id || currentIndex}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <img
                    src={currentPhoto.src}
                    alt={currentPhoto.alt || '추억 사진'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  {/* Subtle photo vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Click Zones on Hover (Desktop) / Tap */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 backdrop-blur-sm hover:bg-black/60"
                aria-label="이전 사진"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 backdrop-blur-sm hover:bg-black/60"
                aria-label="다음 사진"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Paper Margin with Subtle Page Counter */}
            <div className="pt-2 sm:pt-2.5 pb-0.5 w-full flex items-center justify-between px-1.5 flex-shrink-0">
              <span className="font-serif text-[9px] tracking-[0.25em] uppercase text-stone-500 font-medium">
                OUR TIMELINE
              </span>
              <span className="font-serif text-[10px] tracking-widest text-stone-500 font-light">
                {currentIndex + 1} / {photos.length}
              </span>
            </div>
          </div>

          {/* Minimalist Dot Indicators */}
          <div className="flex items-center justify-center gap-2 pt-5">
            {photos.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                aria-label={(idx + 1) + "번째 사진 보기"}
                className={
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer " +
                  (currentIndex === idx ? "w-6 bg-[#E8D4C8]" : "w-1.5 bg-white/30 hover:bg-white/60")
                }
              />
            ))}
          </div>

          {/* Subtle Tap Hint */}
          <p className="text-center font-serif text-[11px] text-white/50 tracking-wider pt-2">
            ✦ 바인더를 터치하면 다음 사진으로 넘어갑니다 ✦
          </p>
        </div>
      </motion.div>
    </section>
  );
};
