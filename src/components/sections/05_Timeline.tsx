import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeddingData } from '../../data/wedding';

interface TimelineProps {
  data: WeddingData;
}

export const TimelineSection: React.FC<TimelineProps> = ({ data }) => {
  // Pool of all wedding photos from data
  const timelinePhotos = data.timelinePhotos && data.timelinePhotos.length > 0
    ? data.timelinePhotos.map(p => p.src)
    : [
        '/images/timeline/photo1.jpg',
        '/images/timeline/photo2.jpg',
        '/images/timeline/photo3.jpg',
        '/images/timeline/photo4.jpg',
        '/images/timeline/photo5.jpg',
        '/images/timeline/photo6.jpg',
      ];

  const galleryPhotos = data.gallery && data.gallery.length > 0
    ? data.gallery.map(p => p.src)
    : [];

  // Group photos gracefully across the 3 frames (Camera, Film 1, Film 2)
  const cameraPhotos = [
    timelinePhotos[0] || '/images/timeline/photo1.jpg',
    timelinePhotos[3] || '/images/timeline/photo4.jpg',
    galleryPhotos[0] || '/images/gallery/photo1.jpg',
    galleryPhotos[6] || '/images/gallery/photo7.jpg',
    galleryPhotos[12] || '/images/gallery/photo13.jpg',
  ];

  const film1Photos = [
    timelinePhotos[1] || '/images/timeline/photo2.jpg',
    timelinePhotos[4] || '/images/timeline/photo5.jpg',
    galleryPhotos[1] || '/images/gallery/photo2.jpg',
    galleryPhotos[7] || '/images/gallery/photo8.jpg',
    galleryPhotos[13] || '/images/gallery/photo14.jpg',
  ];

  const film2Photos = [
    timelinePhotos[2] || '/images/timeline/photo3.jpg',
    timelinePhotos[5] || '/images/timeline/photo6.jpg',
    galleryPhotos[2] || '/images/gallery/photo3.jpg',
    galleryPhotos[8] || '/images/gallery/photo9.jpg',
    galleryPhotos[14] || '/images/gallery/photo15.jpg',
  ];

  // 1. Digital Camera State & Auto-Slide (3.4s)
  const [camIndex, setCamIndex] = useState(0);
  const handleCamNext = useCallback(() => {
    setCamIndex((prev) => (prev + 1) % cameraPhotos.length);
  }, [cameraPhotos.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleCamNext();
    }, 3400);
    return () => clearInterval(timer);
  }, [handleCamNext]);

  // 2. Film 1 State & Auto-Slide (4.1s - staggered for organic flow)
  const [film1Index, setFilm1Index] = useState(0);
  const handleFilm1Next = useCallback(() => {
    setFilm1Index((prev) => (prev + 1) % film1Photos.length);
  }, [film1Photos.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleFilm1Next();
    }, 4100);
    return () => clearInterval(timer);
  }, [handleFilm1Next]);

  // 3. Film 2 State & Auto-Slide (4.7s - staggered)
  const [film2Index, setFilm2Index] = useState(0);
  const handleFilm2Next = useCallback(() => {
    setFilm2Index((prev) => (prev + 1) % film2Photos.length);
  }, [film2Photos.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleFilm2Next();
    }, 4700);
    return () => clearInterval(timer);
  }, [handleFilm2Next]);

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
            디지털 카메라와 필름에 담아낸 둘만의 소중한 시간들
          </p>
        </div>

        {/* Clover Divider */}
        <div className="flex items-center justify-center gap-3">
          <span className="w-10 h-[1px] bg-white/25" />
          <span className="text-[11px] text-white/50 tracking-widest font-light">✤</span>
          <span className="w-10 h-[1px] bg-white/25" />
        </div>

        {/* Retro Collage Container: 576 x 1024 Aspect Ratio */}
        <div className="relative flex flex-col items-center justify-center pt-2">
          <div className="relative w-full max-w-[350px] sm:max-w-[390px] aspect-[576/1024] select-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
            
            {/* ============================================================== */}
            {/* 1. DIGITAL CAMERA LCD SCREEN (x: 74..315, y: 101..281)         */}
            {/* ============================================================== */}
            <div
              onClick={handleCamNext}
              style={{
                left: '12.6%',
                top: '9.7%',
                width: '42.3%',
                height: '17.8%',
              }}
              className="absolute overflow-hidden bg-black cursor-pointer group"
              title="터치 시 다음 사진"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={cameraPhotos[camIndex]}
                  src={cameraPhotos[camIndex]}
                  alt="디지털 카메라 속 사진"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Retro Digital Camera LCD HUD Overlay */}
              <div className="absolute inset-0 pointer-events-none p-1.5 flex flex-col justify-between text-[8px] sm:text-[9px] font-mono text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] z-10">
                <div className="flex items-center justify-between">
                  {/* REC Indicator */}
                  <span className="flex items-center gap-1 font-semibold tracking-wider text-red-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    REC
                  </span>
                  {/* Battery */}
                  <span className="text-white/80 tracking-widest text-[7px]">
                    [▮▮▮]
                  </span>
                </div>
                <div className="flex items-center justify-between text-[7px] text-white/70">
                  <span>ISO 100</span>
                  <span className="font-serif">27.05.08</span>
                </div>
              </div>

              {/* Subtle LCD Scanline / Glass Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.12] pointer-events-none z-10" />
            </div>

            {/* ============================================================== */}
            {/* 2. FILM FRAME 1 (MIDDLE RIGHT: x: 256..556, y: 399..613)       */}
            {/* ============================================================== */}
            <div
              onClick={handleFilm1Next}
              style={{
                left: '44.2%',
                top: '38.8%',
                width: '52.4%',
                height: '21.0%',
              }}
              className="absolute overflow-hidden bg-stone-900 cursor-pointer group"
              title="터치 시 다음 사진"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={film1Photos[film1Index]}
                  src={film1Photos[film1Index]}
                  alt="필름 사진 1"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.65, ease: 'easeInOut' }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Vintage Film Overlay: Crosshair & Warm Wash */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-white/20 text-xs font-light z-10">
                <span>+</span>
              </div>
              <div className="absolute inset-0 bg-amber-900/[0.08] pointer-events-none mix-blend-color z-10" />
            </div>

            {/* ============================================================== */}
            {/* 3. FILM FRAME 2 (BOTTOM LEFT/CENTER: x: 138..438, y: 723..937) */}
            {/* ============================================================== */}
            <div
              onClick={handleFilm2Next}
              style={{
                left: '23.8%',
                top: '70.5%',
                width: '52.4%',
                height: '21.0%',
              }}
              className="absolute overflow-hidden bg-stone-900 cursor-pointer group"
              title="터치 시 다음 사진"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={film2Photos[film2Index]}
                  src={film2Photos[film2Index]}
                  alt="필름 사진 2"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.65, ease: 'easeInOut' }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Vintage Film Overlay: Crosshair & Warm Wash */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-white/20 text-xs font-light z-10">
                <span>+</span>
              </div>
              <div className="absolute inset-0 bg-amber-900/[0.08] pointer-events-none mix-blend-color z-10" />
            </div>

            {/* ============================================================== */}
            {/* 4. MASTER RETRO OVERLAY (Canon Camera + 35mm Films + Stars)    */}
            {/* ============================================================== */}
            <img
              src="/images/timeline_retro_template.png"
              alt="디지털 카메라와 빈티지 필름 틀"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-20"
              draggable={false}
            />
          </div>

          {/* Touch / Interaction Hint */}
          <div className="pt-6 space-y-1 text-center">
            <p className="font-serif text-[11px] text-white/60 tracking-wider">
              ✦ 디카와 필름의 사진이 자동으로 흘러갑니다 ✦
            </p>
            <p className="font-serif text-[9px] text-white/40 tracking-wider">
              (각 프레임을 가볍게 터치하시면 다음 사진으로 바로 넘겨보실 수 있습니다)
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
