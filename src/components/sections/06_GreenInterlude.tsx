import React from 'react';
import { motion } from 'framer-motion';

export const GreenInterludeSection: React.FC = () => {
  return (
    <section className="min-h-[70vh] bg-[#465F4C] text-white flex flex-col items-center justify-center text-center px-6 py-20 relative overflow-hidden">
      {/* Decorative thin border box */}
      <div className="absolute inset-6 border border-white/15 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0 }}
        className="space-y-4 z-10"
      >
        <span className="font-serif text-sm tracking-editorial uppercase text-white/80 block">
          AND THEN
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl tracking-widest text-white uppercase font-light leading-tight">
          WE SAID
        </h2>

        <span className="font-serif text-4xl sm:text-5xl tracking-editorial text-champagne block italic font-normal pt-2">
          YES.
        </span>
      </motion.div>
    </section>
  );
};
