import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Utensils, HeartHandshake } from 'lucide-react';
import { WeddingData } from '../../data/wedding';
import { Sticker } from '../Sticker';

interface InformationProps {
  data: WeddingData;
}

export const InformationSection: React.FC<InformationProps> = ({ data }) => {
  return (
    <section id="information" className="py-24 px-6 bg-[#465F4C] text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto space-y-8 text-center"
      >
        <div className="space-y-2">
          <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
            NOTICE & GUIDE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-widest text-white uppercase font-light">
            INFORMATION
          </h2>
          <p className="font-serif text-xs text-white/70 font-light">
            참석해 주시는 하객 여러분을 위한 안내사항
          </p>
        </div>

        {/* Clover Divider */}
        <div className="flex items-center justify-center gap-3">
          <span className="w-10 h-[1px] bg-white/25" />
          <span className="text-[11px] text-white/50 tracking-widest font-light">✤</span>
          <span className="w-10 h-[1px] bg-white/25" />
        </div>

        {/* Info Cards List */}
        <div className="space-y-4 text-left">
          {/* 1. PHOTO BOOTH (User Explicit Feature) */}
          <div className="border border-white/25 bg-white/[0.06] backdrop-blur-sm p-5 relative overflow-hidden shadow-sm">
            <Sticker
              type="polaroid"
              width={45}
              rotate={12}
              className="absolute -top-3 -right-2 z-10 pointer-events-none opacity-85"
            />
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Camera className="w-3.5 h-3.5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-sm text-white font-medium tracking-wide">
                Photo Booth (포토부스) 안내
              </h3>
            </div>
            <p className="font-serif text-xs text-white/90 leading-relaxed font-light">
              Photo Booth가 <span className="font-medium text-white underline decoration-white/40 underline-offset-4">8층 로비</span>에 설치되어 있으니 많은 이용 부탁드립니다.
            </p>
            <p className="font-serif text-[11px] text-white/70 leading-relaxed font-light pt-1.5">
              소중한 날 귀한 발걸음 해주신 여러분의 환한 미소를 사진으로 남겨주세요. 인화된 사진은 한 장 소장하시고, 한 장은 방명록에 따뜻한 축하와 함께 남겨주시면 큰 기쁨이 됩니다.
            </p>
          </div>

          {/* 2. 식사 안내 */}
          <div className="border border-white/15 bg-white/[0.03] p-5">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Utensils className="w-3.5 h-3.5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-sm text-white font-medium tracking-wide">
                식사 안내
              </h3>
            </div>
            <p className="font-serif text-xs text-white/80 leading-relaxed font-light">
              예식 후 연회장에서 정성껏 준비한 식사가 제공됩니다. 귀한 걸음 해주신 만큼 정갈하고 맛있는 음식과 함께 즐거운 시간 보내시길 바랍니다.
            </p>
          </div>

          {/* 3. 마음 전하기 / 화환 안내 */}
          <div className="border border-white/15 bg-white/[0.03] p-5">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
                <HeartHandshake className="w-3.5 h-3.5 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-sm text-white font-medium tracking-wide">
                화환 안내
              </h3>
            </div>
            <p className="font-serif text-xs text-white/80 leading-relaxed font-light">
              축하의 뜻으로 보내주시는 화환은 정중히 사양하오니 양해 부탁드립니다. 보내주시는 따뜻한 축복의 마음만으로도 충분히 감사드립니다.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
