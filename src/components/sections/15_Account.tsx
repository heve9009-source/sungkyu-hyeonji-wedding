import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Copy, Check } from 'lucide-react';
import { WeddingData } from '../../data/wedding';

interface AccountProps {
  data: WeddingData;
}

export const AccountSection: React.FC<AccountProps> = ({ data }) => {
  const [openSection, setOpenSection] = useState<'groom' | 'bride' | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toggle = (side: 'groom' | 'bride') => {
    setOpenSection(openSection === side ? null : side);
  };

  const copyToClipboard = (account: string, key: string) => {
    navigator.clipboard.writeText(account).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    });
  };

  return (
    <section id="account" className="py-36 px-7 bg-[#465F4C] text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="max-w-sm mx-auto space-y-12 text-center"
      >
        <div className="space-y-2">
          <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
            GIFT
          </span>
          <h2 className="font-serif text-xl sm:text-2xl tracking-widest text-white uppercase font-light leading-relaxed">
            FOR THOSE WHO WOULD LIKE TO SHARE OUR JOY
          </h2>
        </div>

        <p className="font-sans text-xs text-white/75 leading-relaxed font-light">
          축복하는 마음으로 축의금을 전달하고자 하시는 분들을 위해<br />
          계좌번호를 안내해 드립니다.
        </p>

        {/* Minimal Translucent Line Accordions */}
        <div className="space-y-4 text-left pt-2">
          {/* Groom Accordion */}
          <div className="border border-white/20 bg-white/[0.04] backdrop-blur-sm">
            <button
              onClick={() => toggle('groom')}
              className="w-full p-4 flex justify-between items-center text-xs font-paperlogy tracking-widest uppercase text-white font-light"
            >
              <span>신랑측 마음 전하실 곳</span>
              <ChevronDown
                className={`w-4 h-4 text-white/70 transition-transform duration-300 ${
                  openSection === 'groom' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {openSection === 'groom' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-white/15 px-4 py-4 space-y-3 bg-white/[0.02]"
                >
                  <div className="flex justify-between items-center text-xs font-serifkr">
                    <div>
                      <span className="text-white/60 block text-[10px]">신랑 {data.groom.nameKo}</span>
                      <span className="font-serif text-xs font-normal text-white">
                        {data.groom.accountBank} {data.groom.accountNumber}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(data.groom.accountNumber, 'groom-self')}
                      className="px-2.5 py-1.5 text-[10px] tracking-wider font-paperlogy uppercase border border-white/20 bg-white/5 text-white/75 hover:bg-white/15 hover:border-white/35 hover:text-white rounded-none flex items-center gap-1 font-light"
                    >
                      {copiedKey === 'groom-self' ? (
                        <>
                          <Check className="w-3 h-3 text-white" />
                          <span>COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-white/70" />
                          <span>COPY</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bride Accordion */}
          <div className="border border-white/20 bg-white/[0.04] backdrop-blur-sm">
            <button
              onClick={() => toggle('bride')}
              className="w-full p-4 flex justify-between items-center text-xs font-paperlogy tracking-widest uppercase text-white font-light"
            >
              <span>신부측 마음 전하실 곳</span>
              <ChevronDown
                className={`w-4 h-4 text-white/70 transition-transform duration-300 ${
                  openSection === 'bride' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {openSection === 'bride' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-white/15 px-4 py-4 space-y-3 bg-white/[0.02]"
                >
                  <div className="flex justify-between items-center text-xs font-serifkr">
                    <div>
                      <span className="text-white/60 block text-[10px]">신부 {data.bride.nameKo}</span>
                      <span className="font-serif text-xs font-normal text-white">
                        {data.bride.accountBank} {data.bride.accountNumber}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(data.bride.accountNumber, 'bride-self')}
                      className="px-2.5 py-1.5 text-[10px] tracking-wider font-paperlogy uppercase border border-white/20 bg-white/5 text-white/75 hover:bg-white/15 hover:border-white/35 hover:text-white rounded-none flex items-center gap-1 font-light"
                    >
                      {copiedKey === 'bride-self' ? (
                        <>
                          <Check className="w-3 h-3 text-white" />
                          <span>COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-white/70" />
                          <span>COPY</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
