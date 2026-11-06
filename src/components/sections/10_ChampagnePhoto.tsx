import React from 'react';
import { motion } from 'framer-motion';
import { WeddingData } from '../../data/wedding';
import { Sticker } from '../Sticker';

interface ChampagnePhotoProps {
  data: WeddingData;
}

export const ChampagnePhotoSection: React.FC<ChampagnePhotoProps> = ({ data }) => {
  return (
    <section className="relative w-full min-h-[75vh] bg-[#465F4C] flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={data.images.champagneCouple}
          alt="Champagne Toast Couple"
          className="w-full h-full object-cover opacity-85"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#465F4C] via-transparent to-[#465F4C]/80" />
      </div>

      <div className="relative z-10 p-6 pt-10 text-center flex justify-between items-start">
        <span className="font-serif text-[10px] tracking-editorial uppercase text-white/75">
          CELEBRATION
        </span>

        {/* Garden Chair Sticker */}
        <Sticker
          type="chair"
          width={65}
          rotate={-6}
          className="z-20"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0 }}
        className="relative z-10 p-8 text-center pb-14 space-y-2"
      >
        <h2 className="font-serif text-2xl sm:text-3xl tracking-editorial text-white uppercase font-light">
          CHEERS TO FOREVER.
        </h2>
      </motion.div>
    </section>
  );
};
