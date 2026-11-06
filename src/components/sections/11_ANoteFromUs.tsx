import React from 'react';
import { motion } from 'framer-motion';
import { Sticker } from '../Sticker';

export const ANoteFromUsSection: React.FC = () => {
  return (
    <section id="note" className="py-36 px-7 bg-[#465F4C] text-white text-center relative overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="max-w-sm mx-auto space-y-8 relative"
      >
        {/* Bridal Bouquet Sticker decor */}
        <Sticker
          type="bouquet"
          width={75}
          rotate={8}
          className="absolute -top-12 -left-6 z-20"
        />

        <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
          MESSAGE
        </span>

        <h2 className="font-serif text-2xl sm:text-3xl tracking-widest text-white uppercase font-light">
          A NOTE FROM US
        </h2>

        {/* Elegant Reference Divider */}
        <div className="flex items-center justify-center gap-3 my-6">
          <span className="w-10 h-[1px] bg-white/25" />
          <span className="text-[10px] text-white/50 tracking-widest font-light">✤</span>
          <span className="w-10 h-[1px] bg-white/25" />
        </div>

        <p className="font-serifkr text-xs sm:text-sm text-white/80 leading-loose tracking-wider font-light">
          우리가 함께하는 평범한 하루들이<br />
          앞으로도 가장 특별한 순간이 되기를.<br /><br />
          웃음이 가득한 날도, 조금 힘든 날도<br />
          서로의 가장 가까운 곳에서 함께하겠습니다.
        </p>
      </motion.div>
    </section>
  );
};
