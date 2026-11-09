import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, Copy, Check, ZoomIn, FileText, ExternalLink, X } from 'lucide-react';
import { WeddingData } from '../../data/wedding';

interface LocationMapProps {
  data: WeddingData;
}

export const LocationMapSection: React.FC<LocationMapProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(data.weddingDay.address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  useEffect(() => {
    if (pdfModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [pdfModalOpen]);

  return (
    <section id="location" className="py-24 px-6 bg-transparent text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto space-y-6"
      >
        {/* 1. Header: Location */}
        <div className="space-y-1">
          <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
            WEDDING VENUE
          </span>
          <h2 className="font-serif text-3xl tracking-widest text-white uppercase font-light">
            LOCATION
          </h2>
        </div>

        {/* 2. 구분선 (네잎클로버) */}
        <div className="flex items-center justify-center gap-3">
          <span className="w-10 h-[1px] bg-white/25" />
          <span className="text-[11px] text-white/50 tracking-widest font-light">✤</span>
          <span className="w-10 h-[1px] bg-white/25" />
        </div>

        {/* 3. ADDRESS */}
        <div className="space-y-2">
          <span className="block font-serif text-[10px] tracking-widest uppercase text-white/60 font-medium">
            ADDRESS
          </span>
          <p className="font-serif text-base sm:text-lg text-white font-normal">
            {data.weddingDay.venueName} {data.weddingDay.hallName}
          </p>
          <p className="font-serif text-xs text-white/80 font-light">
            {data.weddingDay.address}
          </p>

          <button
            onClick={handleCopyAddress}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-2 text-[10px] tracking-widest font-serif uppercase border border-white/20 bg-white/5 text-white/75 hover:bg-white/15 hover:text-white transition-all rounded-none font-light cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-white" />
                <span>주소 복사 완료</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-white/60" />
                <span>주소 복사하기</span>
              </>
            )}
          </button>
        </div>

        {/* 4. 구분선 (네잎클로버) */}
        <div className="flex items-center justify-center gap-3">
          <span className="w-10 h-[1px] bg-white/25" />
          <span className="text-[11px] text-white/50 tracking-widest font-light">✤</span>
          <span className="w-10 h-[1px] bg-white/25" />
        </div>

        {/* 5. MAP & Navigation Buttons */}
        <div className="space-y-3 pt-1">
          <span className="block font-serif text-[10px] tracking-widest uppercase text-white/60 font-medium">
            MAP
          </span>

          {/* Interactive Map Visual Card with Corner Flower Accents */}
          <div className="relative group/map">
            {/* Top-Left Corner Flower Accent */}
            <img
              src="/images/map_flower_1.png"
              alt="좌측 상단 꽃 장식"
              className="absolute -top-3.5 -left-3.5 w-11 h-11 sm:w-12 sm:h-12 object-contain pointer-events-none z-20 -rotate-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover/map:scale-105"
            />

            {/* Bottom-Right Corner Flower Accent */}
            <img
              src="/images/map_flower_2.png"
              alt="우측 하단 꽃 장식"
              className="absolute -bottom-3.5 -right-3.5 w-12 h-12 sm:w-14 sm:h-14 object-contain pointer-events-none z-20 rotate-12 drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover/map:scale-105"
            />

            {/* Map Card */}
            <div
              onClick={() => setPdfModalOpen(true)}
              className="w-full border border-white/20 bg-white/[0.04] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/40 shadow-md cursor-pointer relative block"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setPdfModalOpen(true);
                }
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src="/images/ladomus_map.jpg"
                  alt="대전 라도무스 아트센터 약도"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover/map:scale-[1.02]"
                />
                {/* PDF Guide Badge (placed at bottom-left to avoid bottom-right flower) */}
                <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 bg-black/75 text-white text-[10px] tracking-wider font-serif border border-white/25 backdrop-blur-sm flex items-center gap-1.5 rounded-sm group-hover/map:bg-black/90 transition-colors">
                  <ZoomIn className="w-3 h-3 text-white/80" />
                  <span>상세 안내 (PDF) 보기</span>
                </div>
              </div>
            </div>
          </div>

          <p className="font-serif text-[10.5px] text-white/60 tracking-wider font-light">
            ✤ 지도를 누르시면 상세 오시는 길 안내(PDF)가 열립니다.
          </p>

          {/* Low-contrast Ghost Map Buttons (티안나게) */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <a
              href={data.maps.kakao}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2.5 text-[10px] tracking-widest font-serif uppercase border border-white/20 bg-white/5 text-white/85 hover:bg-white/15 hover:border-white/35 hover:text-white transition-all flex flex-col items-center justify-center gap-1 font-light"
            >
              <Navigation className="w-3 h-3 stroke-[1.5] text-white/70" />
              <span>카카오맵</span>
            </a>
            <a
              href={data.maps.naver}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2.5 text-[10px] tracking-widest font-serif uppercase border border-white/20 bg-white/5 text-white/85 hover:bg-white/15 hover:border-white/35 hover:text-white transition-all flex flex-col items-center justify-center gap-1 font-light"
            >
              <Navigation className="w-3 h-3 stroke-[1.5] text-white/70" />
              <span>네이버지도</span>
            </a>
            <a
              href={data.maps.tmap}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2.5 text-[10px] tracking-widest font-serif uppercase border border-white/20 bg-white/5 text-white/85 hover:bg-white/15 hover:border-white/35 hover:text-white transition-all flex flex-col items-center justify-center gap-1 font-light"
            >
              <Navigation className="w-3 h-3 stroke-[1.5] text-white/70" />
              <span>티맵</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* 6. PDF Viewer Modal */}
      <AnimatePresence>
        {pdfModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setPdfModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-md max-h-[88vh] flex flex-col bg-[#2e3f33] border border-white/20 shadow-2xl rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-5 py-3.5 border-b border-white/15 flex items-center justify-between bg-black/20">
                <div className="text-left">
                  <span className="block font-serif text-[9px] tracking-widest text-white/60 uppercase">
                    LA DOMUS ART CENTER
                  </span>
                  <h3 className="font-serif text-sm tracking-wider text-white font-medium">
                    오시는 길 안내
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/ladomus_location_guide.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-serif tracking-wider border border-white/20 bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 text-white/80" />
                    <span>새 창 열기</span>
                  </a>
                  <button
                    onClick={() => setPdfModalOpen(false)}
                    className="p-1 text-white/70 hover:text-white transition-colors"
                    aria-label="닫기"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Embedded PDF frame */}
                <div className="w-full aspect-[4/5] max-h-[50vh] rounded-lg overflow-hidden border border-white/15 bg-white">
                  <iframe
                    src="/ladomus_location_guide.pdf#toolbar=0"
                    title="LA DOMUS 오시는 길 PDF 안내장"
                    className="w-full h-full border-0"
                  />
                </div>

                {/* Direct Open / Download Button */}
                <a
                  href="/ladomus_location_guide.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 text-xs font-serif bg-white/10 hover:bg-white/20 border border-white/25 text-white flex items-center justify-center gap-2 rounded-lg transition-all"
                >
                  <FileText className="w-4 h-4 text-white/80" />
                  <span>PDF 파일 새 창에서 크게 보기</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/60" />
                </a>

                {/* Text summary for instant readability on all devices */}
                <div className="p-4 bg-white/[0.05] border border-white/15 rounded-lg text-left space-y-3 font-serif">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-white font-medium">
                      <span>📍</span>
                      <span>유성IC 방면</span>
                    </div>
                    <p className="text-[11px] text-white/80 leading-relaxed font-light mt-1 pl-5">
                      유성IC삼거리에서 '공주, 계룡산' 방면 좌회전 후 직진 → '서대전,유성' 방면 좌회전 후 직진 → 구암역삼거리 좌회전 → 유성온천역사거리 우회전 → 도안고등학교 → 목원대사거리 우회전 500M
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-xs text-white font-medium">
                      <span>🚌</span>
                      <span>지하철 + 버스</span>
                    </div>
                    <p className="text-[11px] text-white/80 leading-relaxed font-light mt-1 pl-5">
                      유성온천역 6번 출구 → 106번, 706번 중 승차 →<br />
                      106번 흥도초 하차, 706번 등기소/아이파크시티 하차 → 목원대사거리 우측방향 500M 도보
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-3 border-t border-white/15 bg-black/20 text-center">
                <button
                  onClick={() => setPdfModalOpen(false)}
                  className="w-full py-2 text-xs font-serif tracking-widest text-white/80 hover:text-white border border-white/20 bg-white/5 hover:bg-white/15 rounded transition-all"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
