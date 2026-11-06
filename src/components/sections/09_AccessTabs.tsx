import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Train, Bus } from 'lucide-react';
import { WeddingData } from '../../data/wedding';

interface AccessTabsProps {
  data: WeddingData;
}

type TabType = 'parking' | 'car' | 'subway' | 'bus';

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

  const contentMap: Record<TabType, string> = {
    parking: data.accessInfo?.parking || "• 라도무스아트센터 전용 주차타워 및 지상/지하 주차장 무료 이용 가능합니다.\n• 예식 하객 분들을 위한 넉넉한 주차 공간이 완비되어 있습니다 (동시 1,300여 대 수용).",
    car: data.accessInfo?.car || "• 네비게이션 검색: '라도무스아트센터' 또는 '대전 유성구 동서대로 639' (원신흥동 578-6)\n• 유성 IC 방면: 유성 IC 진출 후 월드컵경기장 네거리 방면 약 10분 소요\n• 서대전 IC 방면: 진잠 네거리 → 도안동 방면 약 15분 소요",
    subway: data.accessInfo?.subway || "• 대전 지하철 1호선 [유성온천역] 하차 (3번 출구)\n• 시내버스(115번, 312번) 또는 택시 환승 (차량 약 7분 소요)",
    bus: data.accessInfo?.bus || "• '라도무스아트센터' 또는 '어울림하트아파트' 정류장 하차\n• 간선버스: 114번, 115번, 312번, 706번\n• 지선버스: 106번, 604번"
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
                className={`py-2 px-1 text-xs font-serif flex items-center justify-center gap-1 transition-all ${
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
        <div className="border border-white/15 bg-white/[0.04] p-5 min-h-[130px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="w-full text-left"
            >
              <div className="space-y-2">
                <span className="font-serif text-[10px] tracking-widest uppercase text-[#E8D4C8] block font-medium">
                  {tabs.find((t) => t.id === activeTab)?.label} 안내
                </span>
                <p className="font-serif text-xs text-white/85 leading-relaxed font-light whitespace-pre-line">
                  {contentMap[activeTab]}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
