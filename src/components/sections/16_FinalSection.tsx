import React from 'react';
import { motion } from 'framer-motion';
import { WeddingData } from '../../data/wedding';

interface FinalProps {
  data: WeddingData;
}

export const FinalSection: React.FC<FinalProps> = ({ data }) => {
  return (
    <section className="py-32 px-7 bg-[#465F4C] text-white text-center relative overflow-hidden">
      {/* Decorative inner frame */}
      <div className="absolute inset-6 border border-white/15 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0 }}
        className="max-w-md mx-auto space-y-8 z-10 relative"
      >
        <span className="block font-serif text-[11px] tracking-editorial uppercase text-white/70">
          WITH ALL OUR LOVE
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl tracking-widest text-white uppercase font-light">
          {data.bride.nameEn} & {data.groom.nameEn}
        </h2>

        <div className="w-8 h-[1px] bg-white/30 mx-auto my-6" />

        <p className="font-serif text-xs tracking-editorial text-white/80 uppercase font-light leading-relaxed">
          THANK YOU FOR BEING PART OF OUR STORY.
        </p>

        <p className="font-sans text-[10px] text-white/40 pt-10 tracking-widest uppercase">
          © 2026 {data.bride.nameEn} & {data.groom.nameEn}. ALL RIGHTS RESERVED.
        </p>
      </motion.div>
    </section>
  );
};
