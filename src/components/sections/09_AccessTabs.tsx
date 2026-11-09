import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Train, Bus } from 'lucide-react';
import { WeddingData } from '../../data/wedding';

interface AccessTabsProps {
  data: WeddingData;
}

type TabType = 'parking' | 'car' | 'subway' | 'bus';

interface AccessItem {
  text: string;
  subtext?: string;
}

export const AccessTabsSection: React.FC<AccessTabsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<TabType>('parking');

  const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
    {
      id: 'parking',
      label: '주차',
      icon: (
        <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] font-bold leading-none">
          P
        </span>
      ),
    },
    { id: 'car', label: '자차', icon: <Car className="w-3.5 h-3.5" /> },
    { id: 'subway', label: '지하철', icon: <Train className="w-3.5 h-3.5" /> },
    { id: 'bus', label: '버스', icon: <Bus className="w-3.5 h-3.5" /> },
  ];

  const accessData: Record<TabType, AccessItem[]> = {
    parking: [
      {
        text: "라도무스 전용 주차타워 및 외부주차장(제 2,3,4 주차장)",
        subtext: "* 주차 혼잡예상으로 외부주차를 추천드립니다♥",
      },
      {
        text: "하객분들을 위한 넉넉한 주차공간 완비(동시 2,300대 수용)",
      },
    ],
    car: [
      {
        text: "네비게이션 검색: '라도무스아트센터' 또는 '대전 유성구 동서대로 639' (원신흥동 578-6)",
      },
      {
        text: "유성 IC 방면: 유성 IC 진출 후 월드컵경기장 네거리 방면 약 10분 소요",
      },
      {
        text: "서대전 IC 방면: 진잠 네거리 → 도안동 방면 약 15분 소요",
      },
    ],
    subway: [
      {
        text: "대전 지하철 1호선 [유성온천역] 하차 (3번 출구)",
      },
      {
        text: "시내버스(115번, 312번) 또는 택시 환승 (차량 약 7분 소요)",
      },
    ],
    bus: [
      {
        text: "'라도무스아트센터' 또는 '어울림하트아파트' 정류장 하차",
      },
      {
        text: "간선버스: 114번, 115번, 312번, 706번",
      },
      {
        text: "지선버스: 106번, 604번",
      },
    ],
  };

  return (
    <section id="access" className="py-20 px-6 bg-transparent text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto space-y-7"
      >
        <div className="text-center space-y-2">
          <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
            TRANSPORTATION
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-widest text-white uppercase font-light">
            ACCESS
          </h2>
          <p className="font-serif text-xs text-white/70 font-light">
            예식장으로 찾아오시는 교통편 안내
          </p>
        </div>

        {/* Clover Divider */}
        <div className="flex items-center justify-center gap-3">
          <span className="w-10 h-[1px] bg-white/25" />
          <span className="text-[11px] text-white/50 tracking-widest font-light">✤</span>
          <span className="w-10 h-[1px] bg-white/25" />
        </div>

        {/* 4 Tabs Selector: (주차), (자차), (지하철), (버스) */}
        <div className="grid grid-cols-4 gap-1.5 border border-white/20 p-1 bg-white/[0.03]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 text-xs font-serif flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white/15 text-white font-medium border border-white/30 shadow-sm'
                    : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>({tab.label})</span>
              </button>
            );
          })}
        </div>

        {/* Lower Description Content Panel */}
        <div className="border border-white/15 bg-white/[0.04] p-5 sm:p-6 min-h-[140px] flex items-center backdrop-blur-sm shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="w-full text-left"
            >
              <div className="space-y-3">
                {/* Enlarged Title Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-serif text-[15px] sm:text-base tracking-wider text-[#F4EBE1] font-medium">
                    {tabs.find((t) => t.id === activeTab)?.label} 안내
                  </span>
                  <span className="text-[9px] font-serif tracking-widest uppercase text-white/40 font-light">
                    GUIDE
                  </span>
                </div>

                {/* Hanging Indented Bullet List */}
                <div className="space-y-2.5 pt-0.5">
                  {accessData[activeTab].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-left">
                      <span className="shrink-0 select-none text-white/70 text-xs sm:text-[13px] font-serif leading-relaxed">
                        ·
                      </span>
                      <div className="flex-1 min-w-0 text-xs sm:text-[13px] text-white/90 font-serif font-light leading-relaxed">
                        <span>{item.text}</span>
                        {item.subtext && (
                          <span className="text-[10px] sm:text-[11px] text-[#F3D7C6] font-light ml-1.5 inline-block">
                            {item.subtext}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
