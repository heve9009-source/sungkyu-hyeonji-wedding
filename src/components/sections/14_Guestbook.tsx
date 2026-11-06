import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { guestbookService, GuestbookEntry } from '../../services/guestbook';
import { Sticker } from '../Sticker';

export const GuestbookSection: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    guestbookService.getEntries().then(setEntries);

    const unsubscribe = guestbookService.subscribe((newEntry) => {
      setEntries((prev) => [newEntry, ...prev.filter(e => e.id !== newEntry.id)]);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const newEntry = await guestbookService.addEntry(name, message);
    if (newEntry) {
      setEntries((prev) => [newEntry, ...prev.filter(e => e.id !== newEntry.id)]);
      setName('');
      setMessage('');
    }
  };

  return (
    <section id="guestbook" className="py-36 px-7 bg-[#465F4C] text-white relative overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="max-w-sm mx-auto space-y-12 relative"
      >
        {/* Arch sticker decor */}
        <Sticker
          type="arch"
          width={70}
          rotate={-6}
          className="absolute -top-12 -left-5 z-20"
        />

        <div className="text-center space-y-2 pt-2">
          <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
            GUESTBOOK
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-widest text-white uppercase font-light">
            LEAVE A NOTE
          </h2>
        </div>

        {/* Form - Translucent Note Style */}
        <form onSubmit={handleSubmit} className="space-y-6 border border-white/15 bg-white/[0.04] backdrop-blur-sm p-6 relative">
          <Sticker
            type="chamomile-bouquet"
            width={52}
            rotate={10}
            className="absolute -top-5 -right-3 z-30"
          />

          <div>
            <label className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 mb-1">
              NAME
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
              className="w-full px-3 py-2 bg-white/[0.05] border border-white/20 text-xs font-serifkr text-white placeholder-white/40 focus:outline-none focus:border-white/50 rounded-none"
            />
          </div>

          <div>
            <label className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 mb-1">
              MESSAGE
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="축하 메시지를 남겨주세요"
              className="w-full px-3 py-2 bg-white/[0.05] border border-white/20 text-xs font-serifkr text-white placeholder-white/40 focus:outline-none focus:border-white/50 rounded-none resize-none"
            />
          </div>

          {/* Subtle Ghost Submit Button (티안나게) */}
          <button
            type="submit"
            className="w-full py-2.5 text-xs tracking-editorial font-paperlogy uppercase border border-white/25 bg-white/10 text-white/85 hover:bg-white/20 hover:border-white/40 hover:text-white transition-all rounded-none font-light"
          >
            SEND NOTE
          </button>
        </form>

        {/* Translucent Note Cards List */}
        <div className="space-y-4 pt-2">
          {entries.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-5 bg-white/[0.04] border border-white/15 relative space-y-3"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="font-serifkr text-xs font-medium text-white">
                  {item.name}
                </span>
                <span className="font-serif text-[10px] text-white/50 tracking-wider">
                  {new Date(item.createdAt).toLocaleDateString('ko-KR')}
                </span>
              </div>
              <p className="font-serifkr text-xs text-white/80 leading-relaxed font-light whitespace-pre-wrap">
                {item.message}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
