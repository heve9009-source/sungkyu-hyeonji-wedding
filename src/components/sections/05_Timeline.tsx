import React from 'react';
import { motion } from 'framer-motion';
import { WeddingData } from '../../data/wedding';

interface TimelineProps {
  data: WeddingData;
}

export const TimelineSection: React.FC<TimelineProps> = ({ data }) => {
  return (
    <section id="timeline" className="py-24 px-6 bg-[#465F4C] text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto space-y-12"
      >
        <div className="text-center space-y-2">
          <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
            MOMENTS OF LOVE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-widest text-white uppercase font-light">
            우리의 타임라인
          </h2>
          <p className="font-serif text-xs text-white/70 font-light">
            서로를 만나 함께 걸어온 소중한 시간들
          </p>
        </div>

        {/* Clover Divider */}
        <div className="flex items-center justify-center gap-3">
          <span className="w-10 h-[1px] bg-white/25" />
          <span className="text-[11px] text-white/50 tracking-widest font-light">✤</span>
          <span className="w-10 h-[1px] bg-white/25" />
        </div>

        {/* Vertical Timeline Bar with Time & Photos in Sequence */}
        <div className="relative pl-6 ml-2 sm:ml-4 border-l-2 border-white/20 space-y-12 py-2">
          {data.timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="relative space-y-3"
            >
              {/* Timeline Indicator Node on Vertical Bar */}
              <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-[#465F4C] shadow-[0_0_8px_rgba(255,255,255,0.4)]" />

              {/* 1. Time / Year */}
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-sm tracking-widest text-[#E8D4C8] font-medium uppercase">
                  {item.year}
                </span>
                <span className="w-4 h-[1px] bg-white/20" />
                <span className="font-serif text-xs tracking-wider text-white/80 uppercase font-light">
                  {item.title}
                </span>
              </div>

              {/* 2. Photo */}
              {item.photo && (
                <div className="relative w-full aspect-[16/10] overflow-hidden border border-white/15 bg-black/20 shadow-md">
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              )}

              {/* 3. Description */}
              <p className="font-serif text-xs text-white/80 leading-relaxed font-light pt-0.5">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
