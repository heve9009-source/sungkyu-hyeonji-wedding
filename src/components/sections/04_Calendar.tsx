import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Heart } from 'lucide-react';
import { WeddingData } from '../../data/wedding';

interface CalendarProps {
  data: WeddingData;
}

export const CalendarSection: React.FC<CalendarProps> = ({ data }) => {
  // Calculate D-Day to 2027-05-08 13:30
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date('2027-05-08T13:30:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCalendar = () => {
    const title = `[결혼식] ${data.groom.nameKo} & ${data.bride.nameKo}의 예식`;
    const details = `${data.weddingDay.venueName} ${data.weddingDay.hallName}`;
    const location = data.weddingDay.address;
    const startDate = "20270508T133000";
    const endDate = "20270508T153000";

    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Radomus Wedding//NONSGML Event//EN
BEGIN:VEVENT
UID:${Date.now()}@radomuswedding.com
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
    link.setAttribute('download', 'sungkyu-hyeonji-wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // May 2027 Calendar Grid:
  // May 1 is Saturday (index 6).
  // Row 1: empty 6 cells + day 1
  // Row 2: 2, 3, 4, 5, 6, 7, 8
  // Row 3: 9, 10, 11, 12, 13, 14, 15
  // Row 4: 16, 17, 18, 19, 20, 21, 22
  // Row 5: 23, 24, 25, 26, 27, 28, 29
  // Row 6: 30, 31, empty 5 cells
  const daysHeader = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <section id="calendar" className="py-24 px-6 bg-transparent text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto space-y-8"
      >
        <div className="space-y-2">
          <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
            SAVE THE DATE
          </span>
          <h2 className="font-serif text-3xl tracking-widest text-white uppercase font-light">
            MAY, 2027
          </h2>
          <p className="font-serif text-xs text-white/80 font-light">
            2027. 05. 08 · SATURDAY · 1:30 PM
          </p>
        </div>

        {/* Clover Divider */}
        <div className="flex items-center justify-center gap-3">
          <span className="w-10 h-[1px] bg-white/25" />
          <span className="text-[11px] text-white/50 tracking-widest font-light">✤</span>
          <span className="w-10 h-[1px] bg-white/25" />
        </div>

        {/* Artistic Monthly Calendar Box */}
        <div className="p-6 border border-white/15 bg-white/[0.04] backdrop-blur-sm relative">
          {/* Days Header */}
          <div className="grid grid-cols-7 gap-1 text-[10px] font-serif tracking-wider text-white/60 pb-3 border-b border-white/10">
            {daysHeader.map((d, i) => (
              <div key={d} className={i === 0 ? 'text-[#E8D4C8]' : i === 6 ? 'text-white/80' : ''}>
                {d}
              </div>
            ))}
          </div>

          {/* Dates Grid */}
          <div className="grid grid-cols-7 gap-y-3 gap-x-1 pt-4 text-xs font-serif font-light">
            {/* Week 1: 6 empty cells + 1 */}
            <div /><div /><div /><div /><div /><div />
            <div className="flex items-center justify-center h-7 text-white/80">1</div>

            {/* Week 2: 2, 3, 4, 5, 6, 7, 8 (Highlight 8) */}
            <div className="flex items-center justify-center h-7 text-[#E8D4C8]">2</div>
            <div className="flex items-center justify-center h-7 text-white/85">3</div>
            <div className="flex items-center justify-center h-7 text-white/85">4</div>
            <div className="flex items-center justify-center h-7 text-white/85">5</div>
            <div className="flex items-center justify-center h-7 text-white/85">6</div>
            <div className="flex items-center justify-center h-7 text-white/85">7</div>
            <div className="relative flex items-center justify-center h-7">
              {/* Highlight Circle & Heart Accent for Wedding Day */}
              <div className="absolute inset-0.5 rounded-full bg-white text-[#465F4C] font-semibold flex items-center justify-center shadow-lg">
                8
              </div>
              <Heart className="absolute -top-1.5 -right-1 w-3 h-3 text-[#E8D4C8] fill-[#E8D4C8] drop-shadow-sm" />
            </div>

            {/* Week 3: 9 to 15 */}
            <div className="flex items-center justify-center h-7 text-[#E8D4C8]">9</div>
            <div className="flex items-center justify-center h-7 text-white/85">10</div>
            <div className="flex items-center justify-center h-7 text-white/85">11</div>
            <div className="flex items-center justify-center h-7 text-white/85">12</div>
            <div className="flex items-center justify-center h-7 text-white/85">13</div>
            <div className="flex items-center justify-center h-7 text-white/85">14</div>
            <div className="flex items-center justify-center h-7 text-white/80">15</div>

            {/* Week 4: 16 to 22 */}
            <div className="flex items-center justify-center h-7 text-[#E8D4C8]">16</div>
            <div className="flex items-center justify-center h-7 text-white/85">17</div>
            <div className="flex items-center justify-center h-7 text-white/85">18</div>
            <div className="flex items-center justify-center h-7 text-white/85">19</div>
            <div className="flex items-center justify-center h-7 text-white/85">20</div>
            <div className="flex items-center justify-center h-7 text-white/85">21</div>
            <div className="flex items-center justify-center h-7 text-white/80">22</div>

            {/* Week 5: 23 to 29 */}
            <div className="flex items-center justify-center h-7 text-[#E8D4C8]">23</div>
            <div className="flex items-center justify-center h-7 text-white/85">24</div>
            <div className="flex items-center justify-center h-7 text-white/85">25</div>
            <div className="flex items-center justify-center h-7 text-white/85">26</div>
            <div className="flex items-center justify-center h-7 text-white/85">27</div>
            <div className="flex items-center justify-center h-7 text-white/85">28</div>
            <div className="flex items-center justify-center h-7 text-white/80">29</div>

            {/* Week 6: 30 to 31 */}
            <div className="flex items-center justify-center h-7 text-[#E8D4C8]">30</div>
            <div className="flex items-center justify-center h-7 text-white/85">31</div>
          </div>

          {/* D-Day Counter Bar */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-4 text-xs font-serif">
            <span className="text-white/70">성규 ♥ 현지의 예식까지</span>
            <span className="px-2.5 py-1 bg-white/10 border border-white/20 text-white font-medium tracking-wider">
              {timeLeft.days > 0 ? `D-${timeLeft.days}` : 'D-DAY'}
            </span>
          </div>
        </div>

        {/* Add to Calendar Button (티안나는 고스트 버튼) */}
        <div className="pt-2">
          <button
            onClick={handleAddToCalendar}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[11px] tracking-editorial font-serif uppercase border border-white/20 bg-white/5 text-white/80 hover:bg-white/15 hover:border-white/35 hover:text-white transition-all rounded-none font-light"
          >
            <CalendarIcon className="w-3.5 h-3.5 stroke-[1.5] text-white/70" />
            <span>ADD TO CALENDAR</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};
