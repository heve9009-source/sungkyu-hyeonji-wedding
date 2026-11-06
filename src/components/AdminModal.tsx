import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Users, Lock, RefreshCw, CheckCircle2 } from 'lucide-react';
import { rsvpService, RsvpPayload } from '../services/rsvp';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [rsvpList, setRsvpList] = useState<RsvpPayload[]>([]);
  const [loading, setLoading] = useState(false);

  // Default passcode: wedding date '1226' or '0000'
  const CORRECT_PIN = '1226';

  const loadData = async () => {
    setLoading(true);
    const data = await rsvpService.getRsvpList();
    setRsvpList(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadData();
    }
  }, [isOpen, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === CORRECT_PIN || pin === '0000') {
      setIsAuthenticated(true);
      setPinError(false);
      loadData();
    } else {
      setPinError(true);
    }
  };

  // Calculations
  const attendingGuests = rsvpList.filter((r) => r.attend === 'yes');
  const groomCount = attendingGuests
    .filter((r) => r.side === 'groom')
    .reduce((sum, r) => sum + (Number(r.count) || 1), 0);
  const brideCount = attendingGuests
    .filter((r) => r.side === 'bride')
    .reduce((sum, r) => sum + (Number(r.count) || 1), 0);
  const totalCount = groomCount + brideCount;

  // Export to CSV
  const handleExportCsv = () => {
    if (rsvpList.length === 0) return;
    const header = ['등록일시', '성함', '구분', '참석여부', '동반인원', '메모'];
    const rows = rsvpList.map((r) => [
      r.created_at || r.createdAt || '',
      `"${r.name.replace(/"/g, '""')}"`,
      r.side === 'groom' ? '신랑측' : '신부측',
      r.attend === 'yes' ? '참석' : r.attend === 'no' ? '불참' : '미정',
      r.count,
      `"${(r.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [header, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `웨딩참석명단_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md bg-[#3b5140] border border-white/20 text-white shadow-2xl p-6 relative max-h-[90vh] flex flex-col font-serif"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/15 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-white/80" />
                <h3 className="text-sm tracking-widest uppercase font-medium">
                  참석자(RSVP) 관리자 모드
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-white/70 hover:text-white"
                aria-label="닫기"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Content */}
            {!isAuthenticated ? (
              <form onSubmit={handleLogin} className="py-8 text-center space-y-4">
                <Lock className="w-8 h-8 text-white/60 mx-auto stroke-[1.5]" />
                <p className="text-xs text-white/70">
                  신랑·신부 전용 관리자 암호를 입력해주세요.<br />
                  <span className="text-[10px] text-white/40">(초기 비밀번호: 1226 또는 0000)</span>
                </p>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="비밀번호 4자리"
                  maxLength={6}
                  className="w-36 py-2 px-3 text-center bg-white/10 border border-white/25 text-white tracking-widest text-sm focus:outline-none focus:border-white/60 mx-auto block"
                />
                {pinError && (
                  <p className="text-[11px] text-red-300">비밀번호가 일치하지 않습니다.</p>
                )}
                <button
                  type="submit"
                  className="px-6 py-2 text-xs tracking-wider border border-white/30 bg-white/15 text-white hover:bg-white/25 transition-all"
                >
                  확인
                </button>
              </form>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-5 pt-4 text-xs font-serifkr">
                {/* Stats Summary Bar */}
                <div className="grid grid-cols-3 gap-2 text-center p-3 bg-white/5 border border-white/15">
                  <div>
                    <span className="block text-[10px] text-white/60">신랑측 식권</span>
                    <span className="text-base font-semibold text-white">{groomCount}명</span>
                  </div>
                  <div className="border-x border-white/15">
                    <span className="block text-[10px] text-white/60">신부측 식권</span>
                    <span className="text-base font-semibold text-white">{brideCount}명</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/60">총 참석 인원</span>
                    <span className="text-base font-semibold text-champagne">{totalCount}명</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-1">
                  <span className="text-[11px] text-white/60">
                    총 등록 건수: {rsvpList.length}건
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={loadData}
                      disabled={loading}
                      className="p-1.5 border border-white/20 bg-white/5 text-white/80 hover:bg-white/15"
                      title="새로고침"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                      onClick={handleExportCsv}
                      disabled={rsvpList.length === 0}
                      className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] border border-white/30 bg-white/10 hover:bg-white/20 text-white"
                    >
                      <Download className="w-3 h-3" />
                      <span>엑셀(CSV) 저장</span>
                    </button>
                  </div>
                </div>

                {/* RSVP List Table */}
                <div className="space-y-2 max-h-[48vh] overflow-y-auto pr-1">
                  {rsvpList.length === 0 ? (
                    <div className="py-10 text-center text-white/50 text-xs">
                      아직 접수된 참석 응답이 없습니다.
                    </div>
                  ) : (
                    rsvpList.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white/[0.04] border border-white/15 space-y-1"
                      >
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">{item.name}</span>
                            <span className="text-[10px] px-1.5 py-0.5 bg-white/10 border border-white/15 text-white/80">
                              {item.side === 'groom' ? '신랑측' : '신부측'}
                            </span>
                            <span
                              className={`text-[10px] px-1.5 py-0.5 ${
                                item.attend === 'yes'
                                  ? 'bg-emerald-800/60 text-emerald-200'
                                  : item.attend === 'no'
                                  ? 'bg-red-900/60 text-red-200'
                                  : 'bg-amber-900/60 text-amber-200'
                              }`}
                            >
                              {item.attend === 'yes'
                                ? `참석 (${item.count}명)`
                                : item.attend === 'no'
                                ? '불참'
                                : '미정'}
                            </span>
                          </div>
                          <span className="text-[9px] text-white/40">
                            {(item.created_at || item.createdAt || '').slice(0, 10)}
                          </span>
                        </div>
                        {item.message && (
                          <p className="text-[11px] text-white/70 pt-1 italic font-light">
                            "{item.message}"
                          </p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
