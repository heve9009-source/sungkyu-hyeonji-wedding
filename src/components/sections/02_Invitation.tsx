import React from 'react';
import { motion } from 'framer-motion';
import { Sticker } from '../Sticker';

export const InvitationSection: React.FC = () => {
  return (
    <section id="invitation" className="py-36 px-8 bg-[#465F4C] text-white text-center relative overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.9 }}
        className="max-w-sm mx-auto space-y-10 relative"
      >
        {/* Envelope Sticker decor */}
        <Sticker
          type="envelope"
          width={80}
          rotate={-6}
          className="absolute -top-12 -left-6 z-10"
        />

        {/* Bird Seal Sticker decor */}
        <Sticker
          type="bird-seal"
          width={70}
          rotate={6}
          className="absolute -bottom-8 -right-6 z-10"
        />

        <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium pt-4">
          YOU ARE INVITED
        </span>

        <h2 className="font-serifkr text-xl sm:text-2xl font-light text-white leading-relaxed tracking-wide">
          우리의 새로운 계절에<br />당신을 초대합니다.
        </h2>

        {/* Elegant Reference Divider */}
        <div className="flex items-center justify-center gap-3 my-8">
          <span className="w-10 h-[1px] bg-white/25" />
          <span className="text-[10px] text-white/50 tracking-widest font-light">✤</span>
          <span className="w-10 h-[1px] bg-white/25" />
        </div>

        <p className="font-sans text-xs sm:text-sm text-white/80 leading-loose tracking-wider font-light pb-4">
          서로의 하루에 스며들어<br />
          이제는 평생을 함께하고 싶은 사람이 되었습니다.<br /><br />
          저희 두 사람이 사랑으로 맺어지는 날,<br />
          소중한 분들과 함께 그 순간을 나누고 싶습니다.<br /><br />
          따뜻한 마음으로 축복해 주시면<br />
          오래도록 기억하며 행복하게 살아가겠습니다.
        </p>
      </motion.div>
    </section>
  );
};
