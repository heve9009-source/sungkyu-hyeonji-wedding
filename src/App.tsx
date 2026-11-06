import React, { useState, useEffect } from 'react';
import { weddingData } from './data/wedding';
import { FilmGrain } from './components/FilmGrain';
import { HeaderMenu } from './components/HeaderMenu';
import { Lightbox } from './components/Lightbox';
import { EnvelopeOpener } from './components/EnvelopeOpener';
import { AdminModal } from './components/AdminModal';

// 13 Streamlined Sections
import { HeroPhotoSection } from './components/sections/01_HeroPhoto';
import { WeddingInfoSection } from './components/sections/02_WeddingInfo';
import { InvitationSection } from './components/sections/03_Invitation';
import { CalendarSection } from './components/sections/04_Calendar';
import { TimelineSection } from './components/sections/05_Timeline';
import { GalleryJournalSection } from './components/sections/06_GalleryJournal';
import { WeddingVideoSection } from './components/sections/07_WeddingVideo';
import { LocationMapSection } from './components/sections/08_LocationMap';
import { AccessTabsSection } from './components/sections/09_AccessTabs';
import { InformationSection } from './components/sections/10_Information';
import { HandwrittenGuestbookSection } from './components/sections/11_HandwrittenGuestbook';
import { AccountSection } from './components/sections/12_Account';
import { ThankYouSection } from './components/sections/13_ThankYou';

const MENU_SECTIONS = [
  { id: 'hero', label: '메인', enLabel: 'MAIN' },
  { id: 'wedding-info', label: '예식 정보', enLabel: 'INFO' },
  { id: 'invitation', label: '초대합니다', enLabel: 'INVITATION' },
  { id: 'calendar', label: '달력', enLabel: 'CALENDAR' },
  { id: 'timeline', label: '타임라인', enLabel: 'TIMELINE' },
  { id: 'gallery', label: '갤러리', enLabel: 'GALLERY' },
  { id: 'video', label: '영상', enLabel: 'VIDEO' },
  { id: 'location', label: '오시는 길', enLabel: 'LOCATION' },
  { id: 'access', label: '교통편', enLabel: 'ACCESS' },
  { id: 'information', label: '안내사항', enLabel: 'NOTICE' },
  { id: 'guestbook', label: '손글씨 방명록', enLabel: 'GUESTBOOK' },
  { id: 'account', label: '마음 전하실 곳', enLabel: 'ACCOUNT' },
  { id: 'thankyou', label: '감사의 글', enLabel: 'THANK YOU' },
];

export const App: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isOpened, setIsOpened] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('opened') === 'true';
    }
    return false;
  });
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Lock body scroll while envelope opener is active
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpened]);

  return (
    <div className="min-h-screen bg-black flex justify-center selection:bg-white/20 selection:text-white">
      {/* 00. Romantic Photo Lace Envelope Opener (Kept completely intact) */}
      <EnvelopeOpener onOpen={() => setIsOpened(true)} />

      {/* Film Grain Subtle Overlay */}
      <FilmGrain />

      {/* Header Menu & Music Player Centered Overlay */}
      <HeaderMenu sections={MENU_SECTIONS} onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Editorial Mobile Container (Target 375/390/414px) */}
      <main className="w-full max-w-mobile bg-canvas-texture text-white shadow-2xl overflow-x-hidden relative min-h-screen font-serif">
        {/* 01. 메인 사진 크게 */}
        <HeroPhotoSection data={weddingData} />

        {/* 02. 결혼식 정보 (날짜/홀/구분선/혼주/성규&현지) */}
        <WeddingInfoSection data={weddingData} />

        {/* 03. (INVITATION) 초대글 */}
        <InvitationSection />

        {/* 04. (달력) MAY, 2027 달력 아트 (2027.05.08 표시) */}
        <CalendarSection data={weddingData} />

        {/* 05. (우리의 타임라인) 세로로 긴 바모양 시간, 사진 순 */}
        <TimelineSection data={weddingData} />

        {/* 06. (GALLERY) 수첩모양 살리기 */}
        <GalleryJournalSection
          data={weddingData}
          onSelectPhoto={(idx) => setLightboxIndex(idx)}
        />

        {/* 07. (동영상) 추후 넣기 */}
        <WeddingVideoSection data={weddingData} />

        {/* 08. (오시는길) Location, 구분선, ADDRESS, 라도무스 루미니스홀, 구분선, MAP */}
        <LocationMapSection data={weddingData} />

        {/* 09. (ACCESS) (주차), (자차), (지하철), (버스) 4개 탭 */}
        <AccessTabsSection data={weddingData} />

        {/* 10. (INFORMATION) 안내사항 Photo Booth 8층 로비 설치 안내 */}
        <InformationSection data={weddingData} />

        {/* 11. (손글씨 방명록) Handwritten Guest Book 책모양 누르면 */}
        <HandwrittenGuestbookSection />

        {/* 12. (마음 전하실 곳) 신랑측/신부측 탭 & 계좌 복사 */}
        <AccountSection data={weddingData} />

        {/* 13. (Thank you) 마무리 기능 (공유, 스크롤탑, 감사 인사) */}
        <ThankYouSection data={weddingData} />
      </main>

      {/* Fullscreen Lightbox Modal */}
      <Lightbox
        images={weddingData.gallery}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />

      {/* Admin Attendance & RSVP Modal for Groom & Bride */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
};

export default App;
