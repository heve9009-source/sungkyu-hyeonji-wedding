import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Edit3, Type, RotateCcw, Trash2, X, Send, Check } from 'lucide-react';
import { guestbookService, GuestbookEntry } from '../../services/guestbook';
import { Sticker } from '../Sticker';

export const HandwrittenGuestbookSection: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'draw' | 'text'>('draw');
  const [name, setName] = useState('');
  const [textMessage, setTextMessage] = useState('');
  const [penColor, setPenColor] = useState('#FFFFFF');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Load entries & subscribe
  useEffect(() => {
    guestbookService.getEntries().then(setEntries);

    const unsubscribe = guestbookService.subscribe((newEntry) => {
      setEntries((prev) => [newEntry, ...prev.filter((e) => e.id !== newEntry.id)]);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Initialize Canvas
  useEffect(() => {
    if (!isModalOpen || activeTab !== 'draw') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high resolution for crisp drawing
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = penColor;
  }, [isModalOpen, activeTab]);

  // Update pen color
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = penColor;
  }, [penColor]);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    let drawingUrl: string | undefined = undefined;

    if (activeTab === 'draw') {
      const canvas = canvasRef.current;
      if (!canvas || !hasDrawn) {
        alert('캔버스에 손글씨나 서명을 남겨주세요 ✨');
        return;
      }
      drawingUrl = canvas.toDataURL('image/png');
    } else {
      if (!textMessage.trim()) {
        alert('축하 메시지를 입력해주세요 ✨');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const newEntry = await guestbookService.addEntry(name, textMessage, drawingUrl);
      if (newEntry) {
        setEntries((prev) => [newEntry, ...prev.filter((item) => item.id !== newEntry.id)]);
        setSubmitSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitSuccess(false);
          setName('');
          setTextMessage('');
          clearCanvas();
        }, 1200);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="guestbook" className="py-24 px-6 bg-[#465F4C] text-white text-center relative overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-sm mx-auto space-y-8"
      >
        <div className="space-y-2">
          <span className="block font-serif text-[10px] tracking-editorial uppercase text-white/70 font-medium">
            HANDWRITTEN GUEST BOOK
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl tracking-widest text-white uppercase font-light">
            손글씨 방명록
          </h2>
          <p className="font-serif text-xs text-white/70 font-light">
            신랑 성규와 신부 현지에게 따뜻한 손글씨를 선물해 주세요
          </p>
        </div>

        {/* Clover Divider */}
        <div className="flex items-center justify-center gap-3">
          <span className="w-10 h-[1px] bg-white/25" />
          <span className="text-[11px] text-white/50 tracking-widest font-light">✤</span>
          <span className="w-10 h-[1px] bg-white/25" />
        </div>

        {/* Book Trigger Button (책모양 누르면) */}
        <div className="relative pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="w-full py-8 px-6 border border-white/25 bg-white/[0.05] hover:bg-white/[0.09] transition-all flex flex-col items-center justify-center gap-3 shadow-lg group relative"
          >
            {/* Sticker decor */}
            <Sticker
              type="chamomile-bouquet"
              width={48}
              rotate={8}
              className="absolute -top-4 -right-3 z-10 pointer-events-none"
            />

            {/* Book Icon */}
            <div className="w-14 h-14 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white shadow-sm group-hover:scale-105 group-hover:border-white/50 transition-all">
              <BookOpen className="w-6 h-6 stroke-[1.5]" />
            </div>

            <div className="space-y-1">
              <span className="font-serif text-sm text-white tracking-widest font-medium block">
                책을 눌러 방명록 남기기
              </span>
              <span className="font-serif text-[11px] text-white/70 tracking-editorial uppercase block font-light">
                TAP BOOK TO LEAVE A NOTE
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-white/60 tracking-wider font-serif">
              <Edit3 className="w-3 h-3 text-[#E8D4C8]" />
              <span>손글씨 서명 & 축하글 작성</span>
            </div>
          </motion.button>
        </div>

        {/* Live Guestbook List */}
        <div className="space-y-4 pt-4 text-left">
          <div className="flex justify-between items-center px-1">
            <span className="font-serif text-xs text-white/80 font-medium">
              하객들의 축하 메시지 ({entries.length})
            </span>
            <span className="font-serif text-[10px] text-white/50 tracking-wider">
              RECENT NOTES
            </span>
          </div>

          <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
            {entries.length === 0 ? (
              <div className="p-8 text-center border border-white/10 bg-white/[0.02] text-white/60 text-xs font-serif">
                첫 번째 축하 손글씨를 남겨보세요 ✨
              </div>
            ) : (
              entries.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-white/15 bg-white/[0.04] backdrop-blur-xs space-y-2.5 relative"
                >
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="font-serif text-xs font-medium text-white flex items-center gap-1.5">
                      {item.name}
                      {item.drawingUrl && (
                        <span className="text-[9px] px-1.5 py-0.5 border border-white/20 bg-white/10 text-white/70 rounded-none font-serif">
                          손글씨
                        </span>
                      )}
                    </span>
                    <span className="font-serif text-[10px] text-white/50 tracking-wider">
                      {new Date(item.createdAt).toLocaleDateString('ko-KR')}
                    </span>
                  </div>

                  {/* If drawing exists, render drawing image */}
                  {item.drawingUrl && (
                    <div className="w-full bg-black/25 border border-white/10 p-2 flex items-center justify-center rounded-xs overflow-hidden">
                      <img
                        src={item.drawingUrl}
                        alt={`${item.name}님의 손글씨 서명`}
                        className="max-h-32 object-contain select-none"
                      />
                    </div>
                  )}

                  {/* If text message exists, render text */}
                  {item.message && (
                    <p className="font-serif text-xs text-white/85 leading-relaxed font-light whitespace-pre-wrap">
                      {item.message}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>

      {/* Interactive Modal (책모양 누르면 열리는 팝업) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-sm bg-[#3B5040] border border-white/25 text-white p-5 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1 text-white/70 hover:text-white"
                aria-label="Close"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>

              <div className="text-left space-y-1">
                <span className="font-serif text-[10px] tracking-widest text-[#E8D4C8] uppercase block">
                  LEAVE YOUR BLESSING
                </span>
                <h3 className="font-serif text-lg text-white font-medium">
                  방명록 작성하기
                </h3>
              </div>

              {/* Tabs: [손글씨 그리기] vs [메시지 작성] */}
              <div className="grid grid-cols-2 gap-2 border-b border-white/15 pb-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('draw')}
                  className={`py-2 text-xs font-serif flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'draw'
                      ? 'border-b-2 border-white text-white font-medium'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>손글씨 캔버스</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('text')}
                  className={`py-2 text-xs font-serif flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'text'
                      ? 'border-b-2 border-white text-white font-medium'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>텍스트 메시지</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Name Field */}
                <div>
                  <label className="block font-serif text-[10px] tracking-widest uppercase text-white/70 mb-1">
                    성함 (NAME)
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 입력해 주세요"
                    className="w-full px-3 py-2 bg-white/[0.07] border border-white/20 text-xs font-serif text-white placeholder-white/40 focus:outline-none focus:border-white/50 rounded-none"
                  />
                </div>

                {/* Draw Mode: Canvas Drawing */}
                {activeTab === 'draw' && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-serif text-white/70">
                      <span>화면에 직접 서명이나 축하 손글씨를 써주세요</span>
                      <div className="flex items-center gap-2">
                        {/* Color swatches */}
                        {['#FFFFFF', '#E8D4C8', '#AAB29A'].map((col) => (
                          <button
                            key={col}
                            type="button"
                            onClick={() => setPenColor(col)}
                            className={`w-4 h-4 rounded-full border ${
                              penColor === col ? 'scale-125 border-white' : 'border-white/30'
                            }`}
                            style={{ backgroundColor: col }}
                          />
                        ))}
                        <button
                          type="button"
                          onClick={clearCanvas}
                          className="ml-1 p-1 text-white/70 hover:text-white flex items-center gap-1"
                          title="지우기"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Canvas Area */}
                    <div className="w-full aspect-[4/3] border border-white/25 bg-black/40 touch-none relative rounded-none overflow-hidden cursor-crosshair">
                      <canvas
                        ref={canvasRef}
                        className="w-full h-full"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                      />
                      {!hasDrawn && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-white/30 text-xs font-serif">
                          여기에 손글씨를 적어주세요 ✍️
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Text Mode */}
                {activeTab === 'text' && (
                  <div>
                    <label className="block font-serif text-[10px] tracking-widest uppercase text-white/70 mb-1">
                      축하 메시지 (MESSAGE)
                    </label>
                    <textarea
                      rows={4}
                      value={textMessage}
                      onChange={(e) => setTextMessage(e.target.value)}
                      placeholder="두 사람의 앞날을 축복하는 메시지를 남겨주세요"
                      className="w-full px-3 py-2 bg-white/[0.07] border border-white/20 text-xs font-serif text-white placeholder-white/40 focus:outline-none focus:border-white/50 rounded-none resize-none"
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-xs tracking-editorial font-serif uppercase border border-white/30 bg-white/15 text-white hover:bg-white/25 transition-all flex items-center justify-center gap-2"
                >
                  {submitSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>작성 완료! 감사합니다</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? '저장 중...' : '방명록 등록하기'}</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
