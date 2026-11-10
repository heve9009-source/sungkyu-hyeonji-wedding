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
          title: `박성규 ♥ 김현지`,
          text: `'27년 5월 8일 13시 30분, 대전 라도무스 루미니스홀`,
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
    <footer id="thankyou" className="pt-24 pb-20 px-4 sm:px-6 bg-transparent text-white text-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto space-y-8 relative"
      >
        {/* Subtle sticker accent */}
        <Sticker
          type="champagne-tower"
          width={65}
          rotate={-6}
          className="mx-auto opacity-80"
        />

        {/* Section Header */}
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

        {/* Vintage Typewriter Thank You Letter Card */}
        <div className="relative w-full max-w-[340px] sm:max-w-[375px] mx-auto select-none pt-2">
          <div className="relative w-full aspect-[678/1024]">
            {/* Typewriter PNG with Transparent Background */}
            <img
              src="/images/thankyou_typewriter.png"
              alt="Vintage Typewriter Thank You Card"
              className="w-full h-full object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.55)] pointer-events-none select-none"
            />

            {/* Typed Letter Text Area on the Paper (position calibrated to blank space) */}
            <div className="absolute top-[23.5%] left-[17%] right-[17%] bottom-[41%] flex flex-col items-center justify-center text-center px-1 pointer-events-none select-text">
              <div className="space-y-2.5 sm:space-y-3.5 w-full">
                {/* Paragraph 1 */}
                <div className="space-y-1">
                  <p className="font-serif text-[11px] sm:text-[12.5px] leading-relaxed text-[#2C2926] tracking-wide font-normal">
                    저희 두 사람의 새로운 시작을
                  </p>
                  <p className="font-serif text-[11px] sm:text-[12.5px] leading-relaxed text-[#2C2926] tracking-wide font-normal">
                    함께 축복해 주셔서 진심으로 감사드립니다.
                  </p>
                </div>

                {/* Paragraph 2 */}
                <div className="space-y-0.5 sm:space-y-1">
                  <p className="font-serif text-[10px] sm:text-[11.5px] leading-relaxed text-[#4A4641] tracking-wide font-light">
                    보내주신 사랑과 격려 잊지 않고
                  </p>
                  <p className="font-serif text-[10px] sm:text-[11.5px] leading-relaxed text-[#4A4641] tracking-wide font-light">
                    서로를 더 많이 아끼고 배려하며
                  </p>
                  <p className="font-serif text-[10px] sm:text-[11.5px] leading-relaxed text-[#4A4641] tracking-wide font-light">
                    행복한 가정을 이루어가겠습니다.
                  </p>
                </div>

                {/* Author Sign-off */}
                <div className="pt-1 sm:pt-2">
                  <p className="font-serif text-[11px] sm:text-[12.5px] text-[#1E1D1B] font-medium tracking-widest">
                    신랑 {data.groom.nameKo} · 신부 {data.bride.nameKo} 올림
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons: Share & Top */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={handleShareLink}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-[10px] tracking-editorial font-serif uppercase border border-white/20 bg-white/5 text-white/80 hover:bg-white/15 hover:border-white/35 hover:text-white transition-all rounded-none font-light active:scale-95 cursor-pointer"
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
            className="inline-flex items-center gap-1 px-4 py-2.5 text-[10px] tracking-editorial font-serif uppercase border border-white/20 bg-white/5 text-white/80 hover:bg-white/15 hover:border-white/35 hover:text-white transition-all rounded-none font-light active:scale-95 cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 stroke-[1.5] text-white/70" />
            <span>맨 위로</span>
          </button>
        </div>

        {/* Bottom Small Tagline */}
        <div className="pt-8 text-[10px] font-serif tracking-widest text-white/40 uppercase space-y-1">
          <p>2027. 05. 08 · SUNGKYU &amp; HYEONJI</p>
          <p className="text-[9px] tracking-wider text-white/30">MADE BY HYEONJI</p>
        </div>
      </motion.div>
    </footer>
  );
};
