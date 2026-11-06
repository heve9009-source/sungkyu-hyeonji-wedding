import React from 'react';
import { motion } from 'framer-motion';
import { WeddingData } from '../../data/wedding';

interface CoverProps {
  data: WeddingData;
}

export const CoverSection: React.FC<CoverProps> = ({ data }) => {
  return (
    <section id="cover" className="relative min-h-[96vh] flex flex-col justify-between bg-[#465F4C] text-white pb-16 pt-8 px-6">
      {/* Editorial Large Hero Photo with Vintage Stickers */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="w-full relative aspect-[3/4] max-h-[68vh] overflow-visible"
      >
        <div className="w-full h-full overflow-hidden">
          <img
            src={data.images.cover}
            alt="A Garden Wedding Cover"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Magazine Editorial Metadata */}
      <div className="text-center pt-10 space-y-4 relative z-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.4 }}
          className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium"
        >
          A GARDEN WEDDING · EDITORIAL ISSUE
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.6 }}
          className="font-serif text-3xl sm:text-4xl tracking-[0.2em] text-white uppercase font-light"
        >
          {data.bride.nameEn} & {data.groom.nameEn}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.8 }}
          className="flex items-center justify-center gap-3 pt-1"
        >
          <span className="w-6 h-[1px] bg-white/30" />
          <span className="font-serif text-[11px] tracking-editorial text-white/80 uppercase font-medium">
            {data.weddingDay.dateFormattedEn}
          </span>
          <span className="w-6 h-[1px] bg-white/30" />
        </motion.div>
      </div>

      {/* Subtle Scroll Down Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 1.0 }}
        className="text-center pt-6"
      >
        <span className="font-serif text-[9px] tracking-editorial text-white/60 uppercase block">
          SCROLL TO DISCOVER ↓
        </span>
      </motion.div>
    </section>
  );
};
