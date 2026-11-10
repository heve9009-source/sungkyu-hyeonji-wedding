import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { WeddingData } from '../../data/wedding';

interface GalleryJournalProps {
  data: WeddingData;
  onSelectPhoto?: (index: number) => void;
}

export const GalleryJournalSection: React.FC<GalleryJournalProps> = ({ data, onSelectPhoto }) => {
  // Ensure we have 16 photos, falling back to /images/gallery/photo{i}.jpg
  const basePhotos = data.gallery && data.gallery.length > 0 ? data.gallery : [];
  const photos = Array.from({ length: 16 }, (_, i) => {
    return (
      basePhotos[i] || {
        id: i + 1,
        src: `/images/gallery/photo${i + 1}.jpg`,
        alt: `웨딩 사진 ${i + 1}`,
        aspectRatio: 'tall' as const,
      }
    );
  });

  return (
    <section id="gallery" className="py-24 px-3 sm:px-6 bg-transparent text-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto space-y-7"
      >
        {/* Editorial Header */}
        <div className="text-center space-y-2">
          <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
            WEDDING MOODBOARD
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-widest text-white uppercase font-light">
            GALLERY
          </h2>
          <p className="font-serif text-xs text-white/70 font-light">
            소중한 순간들을 담은 우리들의 스냅 갤러리
          </p>
        </div>

        {/* Clover Divider */}
        <div className="flex items-center justify-center gap-3">
          <span className="w-10 h-[1px] bg-white/25" />
          <span className="text-[11px] text-white/50 tracking-widest font-light">✤</span>
          <span className="w-10 h-[1px] bg-white/25" />
        </div>

        {/* Studio Mounting Board Container */}
        <div className="relative w-full select-none">
          <div className="relative bg-[#F4F2EC] rounded-2xl p-3 sm:p-4 shadow-[0_20px_45px_rgba(0,0,0,0.5)] border border-black/10">
            {/* 4x4 Grid of Pinned Paper Cards */}
            <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.id || index}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSelectPhoto?.(index)}
                  className="relative aspect-[1/1.3] rounded-[2px] cursor-pointer group shadow-[0_3px_10px_rgba(0,0,0,0.28)] bg-stone-200 transition-shadow duration-300 hover:shadow-[0_8px_18px_rgba(0,0,0,0.38)] hover:z-20"
                >
                  {/* Photo (Edge-to-edge full bleed on paper with vintage grading) */}
                  <div className="w-full h-full rounded-[2px] overflow-hidden bg-stone-900">
                    <img
                      src={photo.src}
                      alt={photo.alt || `웨딩 갤러리 사진 ${index + 1}`}
                      className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.03] saturate-[0.88] sepia-[0.10] transition-all duration-500 group-hover:scale-105 group-hover:brightness-100 group-hover:sepia-0"
                      loading="lazy"
                    />
                    {/* Subtle hover vignette overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                  </div>

                  {/* Silver Pushpin (pinned at top-center of each paper sheet) */}
                  <div className="absolute -top-1.5 sm:-top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 z-30 pointer-events-none drop-shadow-sm">
                    <img
                      src="/images/gallery_pin.png"
                      alt="Pin"
                      className="w-full h-auto object-contain select-none pointer-events-none"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Board Footnote */}
            <div className="pt-3 sm:pt-4 flex items-center justify-between px-1 text-stone-500 font-serif">
              <span className="text-[9px] tracking-[0.2em] uppercase font-medium">
                PINNED MOODBOARD
              </span>
              <span className="text-[10px] tracking-widest font-light">
                4 × 4 · 16 MOMENTS
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Tap Hint */}
        <p className="text-center font-serif text-[11px] text-white/55 tracking-wider">
          ✦ 사진을 터치하면 크게 보실 수 있습니다 ✦
        </p>

        {/* Full Gallery Expand Button */}
        {onSelectPhoto && (
          <div className="text-center pt-1">
            <button
              onClick={() => onSelectPhoto(0)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-black/20 hover:bg-black/35 backdrop-blur-sm text-xs font-serif tracking-widest text-white/90 hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#E8D4C8]" />
              <span>전체 사진 크게 보기 ({photos.length})</span>
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
};