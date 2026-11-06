import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { WeddingData } from '../../data/wedding';
import { Sticker } from '../Sticker';

interface WeddingDayProps {
  data: WeddingData;
}

export const WeddingDaySection: React.FC<WeddingDayProps> = ({ data }) => {
  const handleAddToCalendar = () => {
    const title = `[결혼식] ${data.groom.nameKo} & ${data.bride.nameKo}의 예식`;
    const details = `${data.weddingDay.venueName} ${data.weddingDay.hallName}`;
    const location = data.weddingDay.address;
    const startDate = "20260516T123000";
    const endDate = "20260516T143000";

    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Garden Wedding//NONSGML Event//EN
BEGIN:VEVENT
UID:${Date.now()}@gardenwedding.com
DTSTAMP:${startDate}Z
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${title}
DESCRIPTION:${details}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'wedding-event.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="weddingday" className="py-36 px-7 bg-[#465F4C] text-white text-center relative overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="max-w-sm mx-auto space-y-10 relative"
      >
        {/* Candelabra Sticker decor */}
        <Sticker
          type="candelabra"
          width={75}
          rotate={-4}
          className="absolute -top-12 -right-4 z-20"
        />

        <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
          SAVE THE DATE
        </span>

        <h2 className="font-serif text-3xl tracking-widest text-white uppercase font-light">
          WEDDING DAY
        </h2>

        {/* Elegant Reference Divider */}
        <div className="flex items-center justify-center gap-3 my-6">
          <span className="w-10 h-[1px] bg-white/25" />
          <span className="text-[10px] text-white/50 tracking-widest font-light">✤</span>
          <span className="w-10 h-[1px] bg-white/25" />
        </div>

        <div className="space-y-4 font-serif">
          <p className="text-2xl text-white font-light tracking-widest">
            {data.weddingDay.dateFormattedKo}
          </p>
          <p className="text-xs text-white/70 tracking-editorial uppercase font-medium">
            {data.weddingDay.timeFormattedKo}
          </p>
        </div>

        <div className="pt-4 space-y-2 font-serifkr">
          <p className="text-base text-white font-normal">
            {data.weddingDay.venueName} {data.weddingDay.hallName}
          </p>
          <p className="text-xs text-white/75 font-light">
            {data.weddingDay.address}
          </p>
        </div>

        {/* Subtle, Low-contrast Ghost Button (티안나게) */}
        <div className="pt-6">
          <button
            onClick={handleAddToCalendar}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-editorial font-paperlogy uppercase border border-white/20 bg-white/5 text-white/75 hover:bg-white/10 hover:border-white/35 hover:text-white transition-all rounded-none font-light"
          >
            <Calendar className="w-3.5 h-3.5 stroke-[1.5] text-white/70" />
            <span>ADD TO CALENDAR</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};
