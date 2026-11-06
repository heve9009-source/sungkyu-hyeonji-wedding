import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Copy, Check } from 'lucide-react';
import { WeddingData } from '../../data/wedding';

interface LocationMapProps {
  data: WeddingData;
}

export const LocationMapSection: React.FC<LocationMapProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(data.weddingDay.address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="location" className="py-24 px-6 bg-transparent text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto space-y-6"
      >
        {/* 1. Header: Location */}
        <div className="space-y-1">
          <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
            WEDDING VENUE
          </span>
          <h2 className="font-serif text-3xl tracking-widest text-white uppercase font-light">
            LOCATION
          </h2>
        </div>

        {/* 2. 구분선 (네잎클로버) */}
        <div className="flex items-center justify-center gap-3">
          <span className="w-10 h-[1px] bg-white/25" />
          <span className="text-[11px] text-white/50 tracking-widest font-light">✤</span>
          <span className="w-10 h-[1px] bg-white/25" />
        </div>

        {/* 3. ADDRESS */}
        <div className="space-y-2">
          <span className="block font-serif text-[10px] tracking-widest uppercase text-white/60 font-medium">
            ADDRESS
          </span>
          <p className="font-serif text-base sm:text-lg text-white font-normal">
            {data.weddingDay.venueName} {data.weddingDay.hallName}
          </p>
          <p className="font-serif text-xs text-white/80 font-light">
            {data.weddingDay.address}
          </p>

          <button
            onClick={handleCopyAddress}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-2 text-[10px] tracking-widest font-serif uppercase border border-white/20 bg-white/5 text-white/75 hover:bg-white/15 hover:text-white transition-all rounded-none font-light"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-white" />
                <span>주소 복사 완료</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-white/60" />
                <span>주소 복사하기</span>
              </>
            )}
          </button>
        </div>

        {/* 4. 구분선 (네잎클로버) */}
        <div className="flex items-center justify-center gap-3">
          <span className="w-10 h-[1px] bg-white/25" />
          <span className="text-[11px] text-white/50 tracking-widest font-light">✤</span>
          <span className="w-10 h-[1px] bg-white/25" />
        </div>

        {/* 5. MAP & Navigation Buttons */}
        <div className="space-y-4 pt-1">
          <span className="block font-serif text-[10px] tracking-widest uppercase text-white/60 font-medium">
            MAP
          </span>

          {/* Interactive Map Visual Card */}
          <div className="w-full aspect-[16/10] border border-white/20 bg-white/[0.04] backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white shadow-sm">
              <MapPin className="w-5 h-5 text-white/90 stroke-[1.5]" />
            </div>
            <div className="space-y-1">
              <p className="font-serif text-sm text-white font-medium">
                {data.weddingDay.venueName}
              </p>
              <p className="font-serif text-[11px] text-white/70 font-light">
                {data.weddingDay.hallName}
              </p>
            </div>
            <a
              href={data.maps.kakao}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-white/60 underline decoration-white/30 underline-offset-4 hover:text-white font-serif"
            >
              카카오맵에서 크게 보기 →
            </a>
          </div>

          {/* Low-contrast Ghost Map Buttons (티안나게) */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <a
              href={data.maps.kakao}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2.5 text-[10px] tracking-widest font-serif uppercase border border-white/20 bg-white/5 text-white/85 hover:bg-white/15 hover:border-white/35 hover:text-white transition-all flex flex-col items-center justify-center gap-1 font-light"
            >
              <Navigation className="w-3 h-3 stroke-[1.5] text-white/70" />
              <span>카카오맵</span>
            </a>
            <a
              href={data.maps.naver}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2.5 text-[10px] tracking-widest font-serif uppercase border border-white/20 bg-white/5 text-white/85 hover:bg-white/15 hover:border-white/35 hover:text-white transition-all flex flex-col items-center justify-center gap-1 font-light"
            >
              <Navigation className="w-3 h-3 stroke-[1.5] text-white/70" />
              <span>네이버지도</span>
            </a>
            <a
              href={data.maps.tmap}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2.5 text-[10px] tracking-widest font-serif uppercase border border-white/20 bg-white/5 text-white/85 hover:bg-white/15 hover:border-white/35 hover:text-white transition-all flex flex-col items-center justify-center gap-1 font-light"
            >
              <Navigation className="w-3 h-3 stroke-[1.5] text-white/70" />
              <span>티맵</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
