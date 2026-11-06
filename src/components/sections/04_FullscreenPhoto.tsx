import React from 'react';
import { motion } from 'framer-motion';
import { WeddingData } from '../../data/wedding';
import { Sticker } from '../Sticker';

interface FullscreenPhotoProps {
  data: WeddingData;
}

export const FullscreenPhotoSection: React.FC<FullscreenPhotoProps> = ({ data }) => {
  return (
    <section className="relative w-full min-h-[85vh] bg-[#465F4C] flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={data.images.brideGarden}
          alt="Bride in Garden"
          className="w-full h-full object-cover opacity-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#465F4C]/80 via-transparent to-[#465F4C]" />
      </div>

      <div className="relative z-10 p-6 pt-10 text-center flex justify-between items-start">
        <span className="font-serif text-[10px] tracking-editorial uppercase text-white/80">
          EDITORIAL SELECTION
        </span>

        {/* Ring Box Sticker decor */}
        <Sticker
          type="ring-box"
          width={65}
          rotate={-8}
          className="z-20"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0 }}
        className="relative z-10 p-8 text-center pb-12"
      >
        <h2 className="font-serif text-xl sm:text-2xl tracking-editorial text-white uppercase font-light">
          ONE OF OUR FAVORITE DAYS
        </h2>
      </motion.div>
    </section>
  );
};
