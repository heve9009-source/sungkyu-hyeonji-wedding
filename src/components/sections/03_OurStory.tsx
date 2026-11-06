import React from 'react';
import { motion } from 'framer-motion';
import { WeddingData } from '../../data/wedding';
import { Sticker } from '../Sticker';

interface StoryProps {
  data: WeddingData;
}

export const OurStorySection: React.FC<StoryProps> = ({ data }) => {
  return (
    <section id="story" className="py-36 px-6 bg-[#465F4C] text-white relative overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="space-y-16"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
            CHAPTER I · OUR STORY
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-widest text-white italic font-light">
            Two people, one beautiful beginning.
          </h2>
        </div>

        {/* Vogue Asymmetric Editorial Photo Offset with Stickers */}
        <div className="relative pt-4">
          <Sticker
            type="calla-stems"
            width={75}
            rotate={-8}
            className="absolute -top-8 -left-2 z-30"
          />

          <div className="w-[78%] ml-0 relative z-10">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={data.images.cover}
                alt="Story Primary"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          
          <div className="w-[52%] absolute right-0 bottom-[-30px] z-20">
            <div className="aspect-[1/1] overflow-hidden p-1 bg-white/10 shadow-2xl border border-white/15 relative">
              <img
                src={data.images.detailShoes}
                alt="Story Secondary Detail"
                className="w-full h-full object-cover"
                loading="lazy"
              />

              <Sticker
                type="white-rose"
                width={75}
                rotate={8}
                className="absolute -bottom-8 -right-4 z-40"
              />
            </div>
          </div>
        </div>

        {/* Text Body */}
        <div className="text-center pt-14 max-w-xs mx-auto">
          <p className="font-serifkr text-sm text-white/80 leading-relaxed font-light">
            서로 다른 계절을 지나<br />
            이제는 같은 곳을 바라보려 합니다.
          </p>
        </div>
      </motion.div>
    </section>
  );
};
