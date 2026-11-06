import React from 'react';
import { motion } from 'framer-motion';
import { WeddingData } from '../../data/wedding';

interface GalleryProps {
  data: WeddingData;
  onSelectPhoto: (index: number) => void;
}

export const GallerySection: React.FC<GalleryProps> = ({ data, onSelectPhoto }) => {
  return (
    <section id="gallery" className="py-28 px-7 bg-[#465F4C] text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto space-y-12"
      >
        <div className="text-center space-y-2">
          <span className="block font-serif text-[11px] tracking-editorial uppercase text-white/70">
            COLLECTION
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-widest text-white uppercase font-light">
            GALLERY
          </h2>
        </div>

        {/* Pinterest Masonry Editorial Grid (Square corners radius-0) */}
        <div className="columns-2 gap-3 space-y-3">
          {data.gallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => onSelectPhoto(index)}
              className="break-inside-avoid relative overflow-hidden border border-white/15 cursor-pointer group"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
