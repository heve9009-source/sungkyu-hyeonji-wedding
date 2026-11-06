import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Copy, Check, Heart } from 'lucide-react';
import { WeddingData } from '../../data/wedding';

interface AccountProps {
  data: WeddingData;
}

export const AccountSection: React.FC<AccountProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (account: string, key: string) => {
    navigator.clipboard.writeText(account).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    });
  };

  const groomAccounts = [
    {
      role: '신랑',
      name: data.groom.nameKo,
      bank: data.groom.accountBank,
      number: data.groom.accountNumber,
      owner: data.groom.accountOwner,
      key: 'groom-main'
    },
    {
      role: '신랑 혼주',
      name: `${data.groom.father} · ${data.groom.mother}`,
      bank: '신한은행',
      number: '110-987-654321',
      owner: data.groom.father,
      key: 'groom-parent'
    }
  ];

  const brideAccounts = [
    {
      role: '신부',
      name: data.bride.nameKo,
      bank: data.bride.accountBank,
      number: data.bride.accountNumber,
      owner: data.bride.accountOwner,
      key: 'bride-main'
    },
    {
      role: '신부 혼주',
      name: `${data.bride.father} · ${data.bride.mother}`,
      bank: '국민은행',
      number: '4321-02-1234567',
      owner: data.bride.father,
      key: 'bride-parent'
    }
  ];

  return (
    <section id="account" className="py-24 px-6 bg-[#465F4C] text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto space-y-8"
      >
        <div className="space-y-2">
          <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
            GIFT FOR COUPLE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-widest text-white uppercase font-light">
            마음 전하실 곳
          </h2>
          <p className="font-serif text-xs text-white/70 font-light leading-relaxed">
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

        {/* 2 Tabs: 신랑측 vs 신부측 */}
        <div className="grid grid-cols-2 gap-2 border border-white/20 p-1 bg-white/[0.03]">
          <button
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

        {/* Account Cards Container */}
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
              {(activeTab === 'groom' ? groomAccounts : brideAccounts).map((acc) => (
                <div
                  key={acc.key}
                  className="p-4 border border-white/15 bg-white/[0.04] backdrop-blur-xs flex justify-between items-center"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-serif tracking-widest text-[#E8D4C8] block font-light">
                      {acc.role} ({acc.name})
                    </span>
                    <p className="font-serif text-xs text-white tracking-wide font-medium">
                      {acc.bank} <span className="font-sans font-light text-white/90">{acc.number}</span>
                    </p>
                    <span className="text-[10px] font-serif text-white/50 block">
                      예금주: {acc.owner}
                    </span>
                  </div>

                  <button
                    onClick={() => copyToClipboard(acc.number, acc.key)}
                    className="px-3 py-2 text-[10px] tracking-widest font-serif uppercase border border-white/20 bg-white/5 text-white/80 hover:bg-white/15 hover:border-white/35 hover:text-white transition-all rounded-none flex items-center gap-1.5 font-light"
                  >
                    {copiedKey === acc.key ? (
                      <>
                        <Check className="w-3 h-3 text-white" />
                        <span>복사됨</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-white/60" />
                        <span>계좌복사</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
