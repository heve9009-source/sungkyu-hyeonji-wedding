import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { WeddingData } from '../../data/wedding';

interface LocationProps {
  data: WeddingData;
}

export const LocationSection: React.FC<LocationProps> = ({ data }) => {
  return (
    <section id="location" className="py-28 px-7 bg-[#465F4C] text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto space-y-8 text-center"
      >
        <span className="block font-serif text-[11px] tracking-editorial uppercase text-white/70">
          LOCATION
        </span>

        <h2 className="font-serif text-3xl tracking-widest text-white uppercase font-light">
          THE PLACE
        </h2>

        <div className="space-y-1 font-serifkr">
          <p className="text-base text-white font-medium">
            {data.weddingDay.venueName} {data.weddingDay.hallName}
          </p>
          <p className="text-xs text-white/75">
            {data.weddingDay.address} (TEL: {data.weddingDay.tel})
          </p>
        </div>

        {/* Minimal Translucent Map Container */}
        <div className="w-full aspect-[16/10] border border-white/15 bg-white/[0.04] backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-3 my-6">
          <MapPin className="w-6 h-6 text-white/80 stroke-[1.5]" />
          <p className="font-serif text-xs text-white/90 tracking-widest uppercase">
            MAP NAVIGATION
          </p>
          <p className="font-sans text-[11px] text-white/60">
            지하철 2호선 서초역 3번 출구 도보 5분
          </p>
        </div>

        {/* Subtle, Low-contrast Navigation Ghost Buttons (티안나게) */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <a
            href={data.maps.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-2.5 text-[10px] tracking-widest font-paperlogy uppercase border border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/35 hover:text-white transition-all rounded-sm flex flex-col items-center justify-center gap-1 font-light"
          >
            <Navigation className="w-3 h-3 stroke-[1.5] text-white/70" />
            <span>KAKAO MAP</span>
          </a>
          <a
            href={data.maps.naver}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-2.5 text-[10px] tracking-widest font-paperlogy uppercase border border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/35 hover:text-white transition-all rounded-sm flex flex-col items-center justify-center gap-1 font-light"
          >
            <Navigation className="w-3 h-3 stroke-[1.5] text-white/70" />
            <span>NAVER MAP</span>
          </a>
          <a
            href={data.maps.tmap}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-2.5 text-[10px] tracking-widest font-paperlogy uppercase border border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/35 hover:text-white transition-all rounded-sm flex flex-col items-center justify-center gap-1 font-light"
          >
            <Navigation className="w-3 h-3 stroke-[1.5] text-white/70" />
            <span>TMAP</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};
