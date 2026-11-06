import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { rsvpService, RsvpPayload } from '../../services/rsvp';

export const RsvpSection: React.FC = () => {
  const [formData, setFormData] = useState<RsvpPayload>({
    name: '',
    side: 'groom',
    attend: 'yes',
    count: 1,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    const success = await rsvpService.submitRsvp(formData);
    if (success) {
      setSubmitted(true);
    }
  };

  return (
    <section id="rsvp" className="py-36 px-7 bg-[#465F4C] text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="max-w-sm mx-auto space-y-12"
      >
        <div className="text-center space-y-2">
          <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
            ATTENDANCE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-widest text-white uppercase font-light">
            WILL YOU JOIN US?
          </h2>
        </div>

        {submitted ? (
          <div className="p-8 border border-white/20 bg-white/[0.06] backdrop-blur-sm text-center space-y-3">
            <h3 className="font-serif text-base tracking-wider text-white uppercase font-light">
              THANK YOU
            </h3>
            <p className="font-serifkr text-xs text-white/80 leading-relaxed font-light">
              참석 여부가 성공적으로 전달되었습니다.<br />소중한 마음 감사드립니다.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 text-left pt-2">
            {/* Name - Line input style */}
            <div className="space-y-2">
              <label className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
                성함 / NAME *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="성함을 입력해주세요"
                className="w-full py-2 bg-transparent border-b border-white/25 text-xs font-serifkr text-white placeholder-white/40 focus:outline-none focus:border-white/60 rounded-none"
              />
            </div>

            {/* Side */}
            <div className="space-y-2">
              <label className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
                구분 / SIDE
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, side: 'groom' })}
                  className={`py-2.5 text-xs font-serifkr border transition-all rounded-none ${
                    formData.side === 'groom'
                      ? 'border-white/40 bg-white/15 text-white font-normal'
                      : 'border-white/20 text-white/60 bg-transparent hover:bg-white/5 font-light'
                  }`}
                >
                  신랑 측
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, side: 'bride' })}
                  className={`py-2.5 text-xs font-serifkr border transition-all rounded-none ${
                    formData.side === 'bride'
                      ? 'border-white/40 bg-white/15 text-white font-normal'
                      : 'border-white/20 text-white/60 bg-transparent hover:bg-white/5 font-light'
                  }`}
                >
                  신부 측
                </button>
              </div>
            </div>

            {/* Attendance Choice */}
            <div className="space-y-2">
              <label className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
                참석 여부 / ATTENDANCE
              </label>
              <div className="space-y-2.5">
                {[
                  { value: 'yes', label: "YES, I'LL BE THERE" },
                  { value: 'maybe', label: 'MAYBE' },
                  { value: 'no', label: "SORRY, I CAN'T" }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, attend: opt.value as any })}
                    className={`w-full py-2.5 text-center text-xs tracking-wider font-paperlogy uppercase border transition-all rounded-none block ${
                      formData.attend === opt.value
                        ? 'border-white/40 bg-white/15 text-white font-normal'
                        : 'border-white/20 text-white/60 bg-transparent hover:bg-white/5 font-light'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Count */}
            <div className="space-y-2">
              <label className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
                동반 인원 / GUESTS
              </label>
              <select
                value={formData.count}
                onChange={(e) => setFormData({ ...formData, count: parseInt(e.target.value, 10) })}
                className="w-full py-2 bg-[#465F4C] border-b border-white/25 text-xs font-serifkr text-white focus:outline-none focus:border-white/60 rounded-none cursor-pointer"
              >
                <option value={1} className="bg-[#465F4C] text-white">1명 (본인)</option>
                <option value={2} className="bg-[#465F4C] text-white">2명</option>
                <option value={3} className="bg-[#465F4C] text-white">3명</option>
                <option value={4} className="bg-[#465F4C] text-white">4명 이상</option>
              </select>
            </div>

            {/* Note */}
            <div className="space-y-2">
              <label className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
                메모 / NOTE (선택)
              </label>
              <textarea
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="전달하실 축하 메시지를 남겨주세요"
                className="w-full py-2 bg-transparent border-b border-white/25 text-xs font-serifkr text-white placeholder-white/40 focus:outline-none focus:border-white/60 rounded-none resize-none"
              />
            </div>

            {/* Subtle Ghost Submit Button (티안나게) */}
            <button
              type="submit"
              className="w-full py-3 mt-6 text-xs tracking-editorial font-paperlogy uppercase border border-white/25 bg-white/10 text-white/85 hover:bg-white/20 hover:border-white/40 hover:text-white transition-all rounded-none font-light"
            >
              SEND RSVP
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
};
