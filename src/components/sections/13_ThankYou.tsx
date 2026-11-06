import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, ArrowUp, Check } from 'lucide-react';
import { WeddingData } from '../../data/wedding';
import { Sticker } from '../Sticker';

interface ThankYouProps {
  data: WeddingData;
}

export const ThankYouSection: React.FC<ThankYouProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleShareLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `성규 ♥ 현지의 모바일 청첩장`,
          text: `2027년 5월 8일 토요일 1:30PM 라도무스아트센터 8층 루미니스홀`,
          url: window.location.href,
        })
        .catch(() => {
          copyUrlFallback();
        });
    } else {
      copyUrlFallback();
    }
  };

  const copyUrlFallback = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="thankyou" className="pt-24 pb-20 px-6 bg-[#465F4C] text-white text-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto space-y-8 relative"
      >
        {/* Subtle sticker accent */}
        <Sticker
          type="champagne-tower"
          width={65}
          rotate={-6}
          className="mx-auto opacity-80"
        />

        <div className="space-y-2">
          <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
            WITH HEARTFELT THANKS
          </span>
          <h2 className="font-serif text-3xl tracking-widest text-white uppercase font-light">
            THANK YOU
          </h2>
        </div>

        {/* Clover Divider */}
        <div className="flex items-center justify-center gap-3">
          <span className="w-10 h-[1px] bg-white/25" />
          <span className="text-[11px] text-white/50 tracking-widest font-light">✤</span>
          <span className="w-10 h-[1px] bg-white/25" />
        </div>

        {/* Warm Closing Message */}
        <div className="font-serif text-xs sm:text-sm text-white/85 leading-loose font-light space-y-3">
          <p>
            저희 두 사람의 새로운 시작을 함께 축복해 주셔서<br />
            진심으로 감사드립니다.
          </p>
          <p>
            보내주신 사랑과 격려 잊지 않고<br />
            서로를 더 많이 아끼고 배려하며<br />
            행복한 가정을 이루어가겠습니다.
          </p>
          <p className="pt-2 text-white font-normal text-sm">
            신랑 {data.groom.nameKo} · 신부 {data.bride.nameKo} 올림
          </p>
        </div>

        {/* Action Buttons: Share & Top */}
        <div className="flex items-center justify-center gap-3 pt-6">
          <button
            onClick={handleShareLink}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-[10px] tracking-editorial font-serif uppercase border border-white/20 bg-white/5 text-white/80 hover:bg-white/15 hover:border-white/35 hover:text-white transition-all rounded-none font-light"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>링크 복사완료</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 stroke-[1.5] text-white/70" />
                <span>청첩장 공유하기</span>
              </>
            )}
          </button>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 px-4 py-2.5 text-[10px] tracking-editorial font-serif uppercase border border-white/20 bg-white/5 text-white/80 hover:bg-white/15 hover:border-white/35 hover:text-white transition-all rounded-none font-light"
          >
            <ArrowUp className="w-3.5 h-3.5 stroke-[1.5] text-white/70" />
            <span>맨 위로</span>
          </button>
        </div>

        {/* Bottom Small Tagline */}
        <div className="pt-8 text-[10px] font-serif tracking-widest text-white/40 uppercase space-y-1">
          <p>2027. 05. 08 · SUNGKYU & HYEONJI</p>
          <p className="text-[9px] tracking-wider text-white/30">MADE WITH LOVE</p>
        </div>
      </motion.div>
    </footer>
  );
};
