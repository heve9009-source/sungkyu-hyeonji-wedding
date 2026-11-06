import React from 'react';
import { motion } from 'framer-motion';
import { Sticker } from '../Sticker';

export const InvitationSection: React.FC = () => {
  return (
    <section id="invitation" className="py-24 px-6 bg-[#465F4C] text-white text-center relative overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="max-w-sm mx-auto space-y-8 relative"
      >
        {/* Envelope sticker decoration */}
        <Sticker
          type="envelope"
          width={70}
          rotate={-6}
          className="absolute -top-10 -left-4 z-10 opacity-90"
        />

        <div className="space-y-2 pt-2">
          <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
            INVITATION
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-widest text-white uppercase font-light">
            소중한 분들을 초대합니다
          </h2>
        </div>

        {/* Clover Divider */}
        <div className="flex items-center justify-center gap-3 my-4">
          <span className="w-10 h-[1px] bg-white/25" />
          <span className="text-[11px] text-white/50 tracking-widest font-light">✤</span>
          <span className="w-10 h-[1px] bg-white/25" />
        </div>

        {/* Warm Invitation Letter */}
        <div className="font-serif text-sm sm:text-[15px] text-white/90 leading-loose tracking-wide font-light space-y-4">
          <p>
            서로의 하루에 조용히 스며들어<br />
            이제는 평생을 함께 걸어가고 싶은<br />
            소중한 사람이 되었습니다.
          </p>
          <p>
            저희 두 사람이 사랑과 믿음으로 하나 되어<br />
            새로운 삶의 첫걸음을 내딛습니다.
          </p>
          <p>
            싱그러운 5월의 햇살 아래<br />
            귀한 걸음으로 자리를 빛내주시어<br />
            따뜻한 축복을 보내주시면 감사하겠습니다.
          </p>
        </div>

        {/* Bird Seal sticker decor */}
        <Sticker
          type="bird-seal"
          width={60}
          rotate={6}
          className="absolute -bottom-6 -right-3 z-10 opacity-90"
        />
      </motion.div>
    </section>
  );
};
