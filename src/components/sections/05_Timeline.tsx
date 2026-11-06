import React from 'react';
import { motion } from 'framer-motion';
import { WeddingData } from '../../data/wedding';

interface TimelineProps {
  data: WeddingData;
}

export const TimelineSection: React.FC<TimelineProps> = ({ data }) => {
  return (
    <section id="timeline" className="py-28 px-7 bg-[#465F4C] text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto space-y-16"
      >
        <div className="text-center space-y-2">
          <span className="block font-serif text-[11px] tracking-editorial uppercase text-white/70 font-medium">
            MOMENTS
          </span>
          <h2 className="font-serif text-2xl tracking-widest text-white uppercase font-light">
            TIMELINE
          </h2>
        </div>

        {/* Clean Editorial Timeline list */}
        <div className="space-y-10 border-l border-white/20 pl-6 ml-4">
          {data.timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative space-y-1"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 bg-white border-2 border-[#465F4C] rounded-full shadow-sm" />

              <span className="font-serif text-xs tracking-widest text-champagne block font-semibold">
                {item.year}
              </span>
              <h3 className="font-serif text-lg tracking-wider text-white uppercase font-normal">
                {item.title}
              </h3>
              <p className="font-sans text-xs text-white/75 leading-relaxed pt-1 font-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
