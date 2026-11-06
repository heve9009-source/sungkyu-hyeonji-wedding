import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { WeddingData } from '../../data/wedding';

interface GalleryJournalProps {
  data: WeddingData;
  onSelectPhoto?: (index: number) => void;
}

// Exact percentage coordinates measured from the template board (562 x 924)
const GALLERY_SLOTS = [
  // Row 1
  { id: 1, left: '9.79%', top: '6.39%', width: '21.17%', height: '13.85%', label: '사진 1' },
  { id: 2, left: '33.45%', top: '6.60%', width: '21.00%', height: '13.64%', label: '사진 2' },
  { id: 3, left: '56.58%', top: '6.71%', width: '35.05%', height: '13.74%', label: '사진 3' },
  // Row 2
  { id: 4, left: '9.61%', top: '21.86%', width: '21.17%', height: '13.96%', label: '사진 4' },
  { id: 5, left: '33.27%', top: '21.97%', width: '39.86%', height: '13.96%', label: '사진 5' },
  { id: 6, left: '74.73%', top: '22.08%', width: '16.90%', height: '14.07%', label: '사진 6' },
  // Row 3
  { id: 7, left: '9.61%', top: '40.26%', width: '46.09%', height: '14.29%', label: '사진 7' },
  { id: 8, left: '57.83%', top: '40.69%', width: '33.63%', height: '13.85%', label: '사진 8' },
  // Row 4 (Large landscape focal photo)
  { id: 9, left: '34.88%', top: '56.17%', width: '56.58%', height: '24.13%', label: '사진 9' },
];

export const GalleryJournalSection: React.FC<GalleryJournalProps> = ({ data, onSelectPhoto }) => {
  // Pull gallery photos from weddingData or fallback to defaults
  const photos = data.gallery && data.gallery.length > 0
    ? data.gallery
    : [
        { id: 1, src: '/images/gallery/photo1.jpg', alt: '웨딩 사진 1', aspectRatio: 'square' as const },
        { id: 2, src: '/images/gallery/photo2.jpg', alt: '웨딩 사진 2', aspectRatio: 'square' as const },
        { id: 3, src: '/images/gallery/photo3.jpg', alt: '웨딩 사진 3', aspectRatio: 'wide' as const },
        { id: 4, src: '/images/gallery/photo4.jpg', alt: '웨딩 사진 4', aspectRatio: 'square' as const },
        { id: 5, src: '/images/gallery/photo5.jpg', alt: '웨딩 사진 5', aspectRatio: 'wide' as const },
        { id: 6, src: '/images/gallery/photo6.jpg', alt: '웨딩 사진 6', aspectRatio: 'tall' as const },
        { id: 7, src: '/images/gallery/photo7.jpg', alt: '웨딩 사진 7', aspectRatio: 'wide' as const },
        { id: 8, src: '/images/gallery/photo8.jpg', alt: '웨딩 사진 8', aspectRatio: 'wide' as const },
        { id: 9, src: '/images/gallery/photo9.jpg', alt: '웨딩 사진 9', aspectRatio: 'wide' as const },
      ];

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 bg-transparent text-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto space-y-8"
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

        {/* Vintage Scrapbook Moodboard Canvas */}
        <div className="relative w-full max-w-[360px] sm:max-w-[400px] mx-auto select-none">
          {/* Aspect Ratio Container (562 : 924 ≈ 1 : 1.644) */}
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{
              paddingBottom: '164.4%',
              filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.45))'
            }}
          >
            {/* The 9 Photo Slots sitting at exact percentages behind the overlay */}
            {GALLERY_SLOTS.map((slot, index) => {
              const photo = photos[index % photos.length];
              return (
                <div
                  key={slot.id}
                  onClick={() => onSelectPhoto?.(index % photos.length)}
                  style={{
                    position: 'absolute',
                    left: slot.left,
                    top: slot.top,
                    width: slot.width,
                    height: slot.height,
                  }}
                  className="overflow-hidden bg-[#FAF6EE] cursor-pointer group z-10"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt || `웨딩 갤러리 사진 ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle hover feedback */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                </div>
              );
            })}

            {/* Vintage Scrapbook Template Overlay & Pin Stickers (z-20) */}
            <img
              src="/images/gallery_template_overlay.png"
              alt="Vintage Scrapbook Moodboard Frame"
              className="absolute inset-0 w-full h-full pointer-events-none z-20 object-fill"
            />
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
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-black/20 hover:bg-black/35 backdrop-blur-sm text-xs font-serif tracking-widest text-white/90 hover:text-white transition-all shadow-sm"
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
