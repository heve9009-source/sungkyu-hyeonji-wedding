import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeddingData } from '../../data/wedding';

interface TimelineProps {
  data: WeddingData;
}

export const TimelineSection: React.FC<TimelineProps> = ({ data }) => {
  const rawPhotos = data.timelinePhotos && data.timelinePhotos.length > 0
    ? data.timelinePhotos
    : [
        {
          id: 1,
          src: '/images/timeline/photo1.jpg',
          alt: '첫 만남',
          title: 'THE FIRST ENCOUNTER',
          year: '2022',
          description: '따뜻했던 봄날의 어느 오후, 두 사람의 첫 대화가 시작되었습니다.'
        },
        {
          id: 2,
          src: '/images/timeline/photo2.jpg',
          alt: '첫 여행',
          title: 'FIRST TRIP TOGETHER',
          year: '2023',
          description: '함께 맞이한 사계절 속에서 서로에 대한 믿음과 사랑이 더욱 깊어졌습니다.'
        },
        {
          id: 3,
          src: '/images/timeline/photo3.jpg',
          alt: '사계절의 추억',
          title: 'SEASONS IN LOVE',
          year: '2024',
          description: '서로가 서로의 가장 편안하고 따뜻한 안식처가 되기로 약속했습니다.'
        },
        {
          id: 4,
          src: '/images/timeline/photo4.jpg',
          alt: '소중한 약속',
          title: 'OUR PROMISE',
          year: '2025',
          description: '평생을 함께 걸어가기로 약속한 그 소중한 순간'
        },
        {
          id: 5,
          src: '/images/timeline/photo5.jpg',
          alt: '웨딩 촬영',
          title: 'WEDDING MOMENT',
          year: '2026',
          description: '서로를 바라보는 눈빛 속에 가득 담긴 설렘과 행복'
        },
        {
          id: 6,
          src: '/images/timeline/photo6.jpg',
          alt: '결혼식의 날',
          title: 'THE WEDDING DAY',
          year: '2027. 05. 08',
          description: '라도무스 루미니스홀에서 영원한 사랑의 첫걸음을 내딛습니다.'
        }
      ];

  // Distribute photos into 3 slots
  const slot0Photos = rawPhotos.filter((_, i) => i % 3 === 0);
  const slot1Photos = rawPhotos.filter((_, i) => i % 3 === 1);
  const slot2Photos = rawPhotos.filter((_, i) => i % 3 === 2);
  const slots = [slot0Photos, slot1Photos, slot2Photos];

  // Current photo index inside each slot
  const [slotIndices, setSlotIndices] = useState<number[]>([0, 0, 0]);
  // Currently active slot (for showing details below)
  const [activeSlot, setActiveSlot] = useState<number>(0);
  // Direction of slide per slot: 1 for right-to-left, -1 for left-to-right
  const [slideDirections, setSlideDirections] = useState<number[]>([1, 1, 1]);

  // Handle manual tap on a specific photo slot
  const handleSlotTap = useCallback((slotIdx: number) => {
    const list = slots[slotIdx];
    if (list.length <= 1) {
      setActiveSlot(slotIdx);
      return;
    }
    setSlideDirections((prev) => {
      const next = [...prev];
      next[slotIdx] = 1;
      return next;
    });
    setSlotIndices((prev) => {
      const next = [...prev];
      next[slotIdx] = (next[slotIdx] + 1) % list.length;
      return next;
    });
    setActiveSlot(slotIdx);
  }, [slots]);

  // Automatic slide interval: sequentially rotates slots (0 -> 1 -> 2)
  useEffect(() => {
    let nextSlotToAdvance = 0;
    const interval = setInterval(() => {
      const targetSlot = nextSlotToAdvance;
      nextSlotToAdvance = (nextSlotToAdvance + 1) % 3;

      const list = slots[targetSlot];
      if (list && list.length > 1) {
        setSlideDirections((prev) => {
          const next = [...prev];
          next[targetSlot] = 1;
          return next;
        });
        setSlotIndices((prev) => {
          const next = [...prev];
          next[targetSlot] = (next[targetSlot] + 1) % list.length;
          return next;
        });
        setActiveSlot(targetSlot);
      }
    }, 3800);

    return () => clearInterval(interval);
  }, [slots]);

  // The active photo object to display in the story caption card
  const activePhotoList = slots[activeSlot];
  const activePhotoIndex = slotIndices[activeSlot] % (activePhotoList?.length || 1);
  const activePhoto = activePhotoList?.[activePhotoIndex] || rawPhotos[0];

  // Background photos for left strip (tilted -8.5deg) and right strip (tilted +8.5deg)
  const leftStripPhotos = [
    rawPhotos[3] || rawPhotos[0],
    rawPhotos[4] || rawPhotos[1],
    rawPhotos[5] || rawPhotos[2]
  ];
  const rightStripPhotos = [
    rawPhotos[1] || rawPhotos[0],
    rawPhotos[2] || rawPhotos[1],
    rawPhotos[0] || rawPhotos[2]
  ];

  return (
    <section id="timeline" className="py-24 px-4 sm:px-6 bg-transparent text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto space-y-10"
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

        {/* Vintage Fanned-out Postage Strips Composition */}
        <div className="relative flex flex-col items-center justify-center select-none pt-4 pb-2">
          {/* Top Label above Clip (like KENDRA WAGNER TRAVEL in reference) */}
          <span className="font-serif text-[10px] sm:text-[11px] tracking-[0.28em] text-white/75 uppercase font-medium mb-3">
            SUNGKYU &amp; HYEONJI · MEMORIES
          </span>

          <div className="relative w-full flex items-center justify-center">
            {/* Flanking Typography - Left */}
            <div className="absolute left-0 sm:left-3 top-1/2 -translate-y-1/2 flex flex-col items-end text-right font-serif z-10 pointer-events-none">
              <span className="text-[9.5px] sm:text-xs tracking-[0.22em] text-white/90 uppercase font-medium leading-tight">
                OUR
              </span>
              <span className="text-[9.5px] sm:text-xs tracking-[0.22em] text-white/90 uppercase font-medium leading-tight">
                TIMELINE
              </span>
              <span className="text-[9px] sm:text-[10px] italic tracking-wider text-[#E8D4C8] font-light mt-1">
                from 2022
              </span>
            </div>

            {/* Central Strips Collage Container */}
            <div className="relative w-[174px] sm:w-[192px] h-[395px] sm:h-[436px] mx-auto flex items-center justify-center">
              {/* 1. Left Strip (tilted -7.5deg) */}
              <div
                className="absolute inset-0 origin-top -rotate-[7.5deg] z-0 opacity-90 transition-transform duration-500 pointer-events-none"
                style={{ filter: 'drop-shadow(-4px 8px 16px rgba(0,0,0,0.4))' }}
              >
                {/* Photo 1 (Window 1) */}
                <div className="absolute left-[6.3%] top-[2.78%] w-[87.4%] h-[27.78%] overflow-hidden rounded-[1px] bg-stone-900">
                  <img
                    src={leftStripPhotos[0].src}
                    alt={leftStripPhotos[0].alt}
                    className="w-full h-full object-cover grayscale-[35%] contrast-[1.05] brightness-95"
                  />
                </div>
                {/* Photo 2 (Window 2) */}
                <div className="absolute left-[6.3%] top-[35.19%] w-[87.4%] h-[27.78%] overflow-hidden rounded-[1px] bg-stone-900">
                  <img
                    src={leftStripPhotos[1].src}
                    alt={leftStripPhotos[1].alt}
                    className="w-full h-full object-cover grayscale-[35%] contrast-[1.05] brightness-95"
                  />
                </div>
                {/* Photo 3 (Window 3) */}
                <div className="absolute left-[6.3%] top-[67.59%] w-[87.4%] h-[27.78%] overflow-hidden rounded-[1px] bg-stone-900">
                  <img
                    src={leftStripPhotos[2].src}
                    alt={leftStripPhotos[2].alt}
                    className="w-full h-full object-cover grayscale-[35%] contrast-[1.05] brightness-95"
                  />
                </div>
                {/* Stamp Frame Overlay */}
                <img
                  src="/images/timeline_stamp_frame.png"
                  alt="Stamp strip background"
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                />
              </div>

              {/* 2. Right Strip (tilted +7.5deg) */}
              <div
                className="absolute inset-0 origin-top rotate-[7.5deg] z-0 opacity-90 transition-transform duration-500 pointer-events-none"
                style={{ filter: 'drop-shadow(4px 8px 16px rgba(0,0,0,0.4))' }}
              >
              {/* Photo 1 (Window 1) */}
              <div className="absolute left-[6.3%] top-[2.78%] w-[87.4%] h-[27.78%] overflow-hidden rounded-[1px] bg-stone-900">
                <img
                  src={rightStripPhotos[0].src}
                  alt={rightStripPhotos[0].alt}
                  className="w-full h-full object-cover grayscale-[35%] contrast-[1.05] brightness-95"
                />
              </div>
              {/* Photo 2 (Window 2) */}
              <div className="absolute left-[6.3%] top-[35.19%] w-[87.4%] h-[27.78%] overflow-hidden rounded-[1px] bg-stone-900">
                <img
                  src={rightStripPhotos[1].src}
                  alt={rightStripPhotos[1].alt}
                  className="w-full h-full object-cover grayscale-[35%] contrast-[1.05] brightness-95"
                />
              </div>
              {/* Photo 3 (Window 3) */}
              <div className="absolute left-[6.3%] top-[67.59%] w-[87.4%] h-[27.78%] overflow-hidden rounded-[1px] bg-stone-900">
                <img
                  src={rightStripPhotos[2].src}
                  alt={rightStripPhotos[2].alt}
                  className="w-full h-full object-cover grayscale-[35%] contrast-[1.05] brightness-95"
                />
              </div>
              {/* Stamp Frame Overlay */}
              <img
                src="/images/timeline_stamp_frame.png"
                alt="Stamp strip background"
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
              />
            </div>

            {/* 3. Center Strip (Straight, Front z-20, Interactive) */}
            <div
              className="absolute inset-0 z-20"
              style={{ filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.45))' }}
            >
              {/* Photo Slot 0 (Top) */}
              <div
                onClick={() => handleSlotTap(0)}
                className={`absolute left-[6.3%] top-[2.78%] w-[87.4%] h-[27.78%] overflow-hidden rounded-[1px] bg-stone-900 cursor-pointer group transition-all duration-300 ${
                  activeSlot === 0 ? 'ring-1 ring-[#E8D4C8]/60' : ''
                }`}
              >
                <AnimatePresence initial={false} mode="wait">
                  {(() => {
                    const photo = slot0Photos[slotIndices[0] % slot0Photos.length];
                    return (
                      <motion.div
                        key={photo.id}
                        initial={{ x: slideDirections[0] * 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -slideDirections[0] * 50, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                        className="relative w-full h-full"
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Subtle Year / Badge overlay */}
                        <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-sm text-[9px] font-serif text-[#E8D4C8] tracking-wider pointer-events-none">
                          {photo.year}
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>

              {/* Photo Slot 1 (Middle) */}
              <div
                onClick={() => handleSlotTap(1)}
                className={`absolute left-[6.3%] top-[35.19%] w-[87.4%] h-[27.78%] overflow-hidden rounded-[1px] bg-stone-900 cursor-pointer group transition-all duration-300 ${
                  activeSlot === 1 ? 'ring-1 ring-[#E8D4C8]/60' : ''
                }`}
              >
                <AnimatePresence initial={false} mode="wait">
                  {(() => {
                    const photo = slot1Photos[slotIndices[1] % slot1Photos.length];
                    return (
                      <motion.div
                        key={photo.id}
                        initial={{ x: slideDirections[1] * 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -slideDirections[1] * 50, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                        className="relative w-full h-full"
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-sm text-[9px] font-serif text-[#E8D4C8] tracking-wider pointer-events-none">
                          {photo.year}
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>

              {/* Photo Slot 2 (Bottom) */}
              <div
                onClick={() => handleSlotTap(2)}
                className={`absolute left-[6.3%] top-[67.59%] w-[87.4%] h-[27.78%] overflow-hidden rounded-[1px] bg-stone-900 cursor-pointer group transition-all duration-300 ${
                  activeSlot === 2 ? 'ring-1 ring-[#E8D4C8]/60' : ''
                }`}
              >
                <AnimatePresence initial={false} mode="wait">
                  {(() => {
                    const photo = slot2Photos[slotIndices[2] % slot2Photos.length];
                    return (
                      <motion.div
                        key={photo.id}
                        initial={{ x: slideDirections[2] * 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -slideDirections[2] * 50, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                        className="relative w-full h-full"
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-sm text-[9px] font-serif text-[#E8D4C8] tracking-wider pointer-events-none">
                          {photo.year}
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>

              {/* Center Stamp Frame Overlay */}
              <img
                src="/images/timeline_stamp_frame.png"
                alt="Stamp strip frame"
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
              />
            </div>

            {/* 4. Top Binder Clip (Anchoring all 3 strips together at the top) */}
            <div className="absolute -top-[28px] sm:-top-[32px] left-1/2 -translate-x-1/2 z-30 w-[58px] sm:w-[64px] pointer-events-none select-none">
              <img
                src="/images/timeline_binder_clip.png"
                alt="Binder Bulldog Clip"
                className="w-full h-auto drop-shadow-[0_8px_14px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>

            {/* Flanking Typography - Right */}
            <div className="absolute right-0 sm:right-3 top-1/2 -translate-y-1/2 flex flex-col items-start text-left font-serif z-10 pointer-events-none">
              <span className="text-[9.5px] sm:text-xs tracking-[0.22em] text-white/90 uppercase font-medium leading-tight">
                SUNGKYU
              </span>
              <span className="text-[9.5px] sm:text-xs tracking-[0.22em] text-white/90 uppercase font-medium leading-tight">
                &amp; HYEONJI
              </span>
              <span className="text-[9px] sm:text-[10px] italic tracking-wider text-[#E8D4C8] font-light mt-1">
                and forever
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Tap Hint */}
        <p className="text-center font-serif text-[11px] text-white/50 tracking-wider">
          ✦ 사진을 터치하면 다음 추억으로 넘어갑니다 ✦
        </p>

        {/* Active Milestone Card */}
        <motion.div
          key={activePhoto.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-sm rounded-xl bg-black/25 backdrop-blur-md border border-white/10 p-5 text-center space-y-2.5 shadow-lg"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="font-serif text-sm tracking-widest text-[#E8D4C8] font-semibold uppercase">
              {activePhoto.year}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8D4C8]/50" />
            <span className="font-serif text-xs tracking-wider text-white font-medium uppercase">
              {activePhoto.title}
            </span>
          </div>
          <p className="font-serif text-xs text-white/80 leading-relaxed font-light">
            {activePhoto.description}
          </p>
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {slots.map((_, sIdx) => {
              const isActive = activeSlot === sIdx;
              return (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => handleSlotTap(sIdx)}
                  aria-label={`추억 ${sIdx + 1} 보기`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'w-5 bg-[#E8D4C8]' : 'w-1.5 bg-white/30'
                  }`}
                />
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
