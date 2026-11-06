import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { WeddingData, AccountItem } from '../../data/wedding';

interface AccountProps {
  data: WeddingData;
}

export const AccountSection: React.FC<AccountProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (accountNumber: string, key: string) => {
    navigator.clipboard.writeText(accountNumber).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    });
  };

  const currentAccounts: AccountItem[] =
    activeTab === 'groom' ? data.groom.accounts : data.bride.accounts;

  return (
    <section id="account" className="py-24 px-6 bg-[#465F4C] text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto space-y-8"
      >
        {/* Section Header: Pure Korean without English text */}
        <div className="space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl tracking-widest text-white uppercase font-light">
            마음 전하실 곳
          </h2>
          <p className="font-serif text-xs text-white/75 font-light leading-relaxed">
            축복해 주시는 따뜻한 마음 감사히 간직하며<br />
            서로를 아끼고 사랑하며 살아가겠습니다.
          </p>
        </div>

        {/* Clover Divider */}
        <div className="flex items-center justify-center gap-3">
          <span className="w-10 h-[1px] bg-white/25" />
          <span className="text-[11px] text-white/50 tracking-widest font-light">✤</span>
          <span className="w-10 h-[1px] bg-white/25" />
        </div>

        {/* 2 Tabs: 신랑측 계좌번호 vs 신부측 계좌번호 */}
        <div className="grid grid-cols-2 gap-2 border border-white/20 p-1 bg-white/[0.03]">
          <button
            type="button"
            onClick={() => setActiveTab('groom')}
            className={`py-2.5 text-xs font-serif tracking-wider transition-all ${
              activeTab === 'groom'
                ? 'bg-white/15 text-white font-medium border border-white/30 shadow-sm'
                : 'text-white/60 hover:text-white/90'
            }`}
          >
            신랑측 계좌번호
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bride')}
            className={`py-2.5 text-xs font-serif tracking-wider transition-all ${
              activeTab === 'bride'
                ? 'bg-white/15 text-white font-medium border border-white/30 shadow-sm'
                : 'text-white/60 hover:text-white/90'
            }`}
          >
            신부측 계좌번호
          </button>
        </div>

        {/* Account Cards Container: Separate cards for Groom/Bride, Father, and Mother */}
        <div className="space-y-3 pt-1 text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              {currentAccounts.map((item, index) => {
                const itemKey = `${activeTab}-${item.role}-${index}`;
                return (
                  <div
                    key={itemKey}
                    className="p-4 border border-white/15 bg-white/[0.04] backdrop-blur-xs flex justify-between items-center"
                  >
                    <div className="space-y-1">
                      {/* 직책(풀 이름) */}
                      <span className="text-xs font-serif tracking-wider text-[#E8D4C8] block font-medium">
                        {item.role}({item.name})
                      </span>
                      <p className="font-serif text-xs text-white tracking-wide font-medium">
                        {item.bank} <span className="font-sans font-light text-white/95">{item.accountNumber}</span>
                      </p>
                      <span className="text-[10px] font-serif text-white/50 block">
                        예금주: {item.accountOwner}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.accountNumber, itemKey)}
                      className="px-3 py-2 text-[10px] tracking-widest font-serif border border-white/20 bg-white/5 text-white/80 hover:bg-white/15 hover:border-white/35 hover:text-white transition-all rounded-none flex items-center gap-1.5 font-light"
                    >
                      {copiedKey === itemKey ? (
                        <>
                          <Check className="w-3 h-3 text-white" />
                          <span>복사완료</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-white/60" />
                          <span>계좌복사</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
