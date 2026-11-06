import React from 'react';
import { motion } from 'framer-motion';
import { WeddingData } from '../../data/wedding';
import { Sticker } from '../Sticker';

interface HeroProps {
  data: WeddingData;
}

export const HeroPhotoSection: React.FC<HeroProps> = ({ data }) => {
  return (
    <section id="hero" className="relative w-full pt-12 pb-16 px-5 bg-transparent text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="max-w-[390px] mx-auto relative">
        {/* Subtle decorative sticker top-right */}
        <Sticker
          type="white-waxflower"
          width={58}
          rotate={12}
          className="absolute -top-7 -right-2 z-20 pointer-events-none drop-shadow-md"
        />

        {/* Small top header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-1.5 mb-6"
        >
          <span className="block font-serif text-[11px] tracking-editorial uppercase text-white/75 font-light">
            WE ARE GETTING MARRIED
          </span>
          <p className="font-serif text-sm tracking-widest text-white/90 uppercase font-light">
            SUNGKYU & HYEONJI
          </p>
        </motion.div>

        {/* Large Vertical Hero Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="relative w-full aspect-[3/4.2] overflow-hidden border border-white/20 shadow-2xl bg-black/20"
        >
          <img
            src={data.images.cover}
            alt="SungKyu & HyeonJi Wedding Hero"
            className="w-full h-full object-cover object-center select-none"
            loading="eager"
            draggable={false}
          />

          {/* Soft inner glow gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

          {/* Bottom Overlay Info on Photo */}
          <div className="absolute inset-x-0 bottom-6 text-center space-y-1.5 px-4 pointer-events-none">
            <span className="font-continuous text-2xl sm:text-3xl text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] block">
              SungKyu & HyeonJi
            </span>
            <span className="font-serif text-[11px] tracking-widest text-white/85 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] block uppercase font-light">
              2027. 05. 08 · SAT · 1:30 PM
            </span>
          </div>
        </motion.div>

        {/* Bottom subtle sticker decor */}
        <Sticker
          type="green-viburnum"
          width={52}
          rotate={-8}
          className="absolute -bottom-5 -left-3 z-20 pointer-events-none drop-shadow-md"
        />
      </div>
    </section>
  );
};
