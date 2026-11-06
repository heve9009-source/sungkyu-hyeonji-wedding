import React from 'react';
import { motion } from 'framer-motion';
import { WeddingData } from '../../data/wedding';

interface WeddingInfoProps {
  data: WeddingData;
}

export const WeddingInfoSection: React.FC<WeddingInfoProps> = ({ data }) => {
  return (
    <section id="wedding-info" className="py-20 px-6 bg-[#465F4C] text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto space-y-7"
      >
        {/* Date, Time & Venue */}
        <div className="space-y-2.5">
          <p className="font-serif text-lg sm:text-xl tracking-widest text-white font-medium">
            2027. 05. 08 · SAT · 1:30PM
          </p>
          <p className="font-serif text-sm sm:text-base tracking-wider text-white/90 font-light">
            {data.weddingDay.venueName} {data.weddingDay.hallName}
          </p>
        </div>

        {/* Four-leaf Clover Divider (네잎클로버 구분선) */}
        <div className="flex items-center justify-center gap-3 py-1">
          <span className="w-12 h-[1px] bg-white/25" />
          <span className="text-xs text-white/60 tracking-widest select-none">✤</span>
          <span className="w-12 h-[1px] bg-white/25" />
        </div>

        {/* Parents and Couple Names */}
        <div className="space-y-2.5 font-serif text-sm sm:text-base leading-relaxed text-white/95 font-light">
          <p className="flex items-center justify-center gap-2">
            <span>{data.groom.father} · {data.groom.mother}</span>
            <span className="text-white/60 text-xs">장남</span>
            <span className="font-medium text-white">{data.groom.nameKo}</span>
          </p>
          <p className="flex items-center justify-center gap-2">
            <span>{data.bride.father} · {data.bride.mother}</span>
            <span className="text-white/60 text-xs">장녀</span>
            <span className="font-medium text-white">{data.bride.nameKo}</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
};
