import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { WeddingData } from '../../data/wedding';

interface VideoProps {
  data: WeddingData;
  videoUrl?: string; // Optional YouTube or mp4 URL for when the video is ready
}

export const WeddingVideoSection: React.FC<VideoProps> = ({ data, videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="video" className="py-24 px-6 bg-transparent text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto space-y-8"
      >
        <div className="space-y-2">
          <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
            WEDDING FILM
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-widest text-white uppercase font-light">
            우리의 영상
          </h2>
          <p className="font-serif text-xs text-white/70 font-light">
            따뜻한 빛과 설렘이 머무는 순간
          </p>
        </div>

        {/* Clover Divider */}
        <div className="flex items-center justify-center gap-3">
          <span className="w-10 h-[1px] bg-white/25" />
          <span className="text-[11px] text-white/50 tracking-widest font-light">✤</span>
          <span className="w-10 h-[1px] bg-white/25" />
        </div>

        {/* Video Player / Placeholder Frame */}
        <div className="relative w-full aspect-[16/9] border border-white/20 bg-black/40 overflow-hidden shadow-2xl group">
          {videoUrl && isPlaying ? (
            <iframe
              src={videoUrl}
              title="Wedding Film"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              {/* Poster Image */}
              <img
                src={data.images.champagneCouple}
                alt="Wedding Film Poster"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/30" />

              {/* Play Button & Coming Soon Hint */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer select-none"
                onClick={() => {
                  if (videoUrl) {
                    setIsPlaying(true);
                  } else {
                    alert('웨딩 영상이 곧 업로드될 예정입니다 ✨');
                  }
                }}
              >
                <div className="relative w-14 h-14 rounded-full border border-white/35 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:bg-white/20 transition-all">
                  <Play className="w-6 h-6 ml-0.5 fill-white stroke-none" />
                  <span className="absolute -inset-1 rounded-full border border-white/20 animate-pulse pointer-events-none" />
                </div>
                <div className="space-y-1 text-center">
                  <span className="font-serif text-[11px] tracking-widest uppercase text-white font-medium block">
                    COMING SOON
                  </span>
                  <span className="font-serif text-[10px] text-white/70 block font-light">
                    추후 영상이 업로드될 예정입니다
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
};
