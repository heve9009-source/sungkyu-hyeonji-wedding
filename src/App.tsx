import React, { useState, useEffect } from 'react';
import { weddingData } from './data/wedding';
import { FilmGrain } from './components/FilmGrain';
import { MusicPlayer } from './components/MusicPlayer';
import { HeaderMenu } from './components/HeaderMenu';
import { Lightbox } from './components/Lightbox';
import { EnvelopeOpener } from './components/EnvelopeOpener';
import { AdminModal } from './components/AdminModal';

// 16 Sections Imports
import { CoverSection } from './components/sections/01_Cover';
import { InvitationSection } from './components/sections/02_Invitation';
import { OurStorySection } from './components/sections/03_OurStory';
import { FullscreenPhotoSection } from './components/sections/04_FullscreenPhoto';
import { TimelineSection } from './components/sections/05_Timeline';
import { GreenInterludeSection } from './components/sections/06_GreenInterlude';
import { TheDetailsSection } from './components/sections/07_TheDetails';
import { WeddingDaySection } from './components/sections/08_WeddingDay';
import { LocationSection } from './components/sections/09_Location';
import { ChampagnePhotoSection } from './components/sections/10_ChampagnePhoto';
import { ANoteFromUsSection } from './components/sections/11_ANoteFromUs';
import { GallerySection } from './components/sections/12_Gallery';
import { RsvpSection } from './components/sections/13_Rsvp';
import { GuestbookSection } from './components/sections/14_Guestbook';
import { AccountSection } from './components/sections/15_Account';
import { FinalSection } from './components/sections/16_FinalSection';

const MENU_SECTIONS = [
  { id: 'cover', label: '표지', enLabel: 'COVER' },
  { id: 'invitation', label: '초대합니다', enLabel: 'INVITATION' },
  { id: 'story', label: '스토리', enLabel: 'OUR STORY' },
  { id: 'timeline', label: '타임라인', enLabel: 'TIMELINE' },
  { id: 'details', label: '디테일', enLabel: 'THE DETAILS' },
  { id: 'weddingday', label: '예식일', enLabel: 'WEDDING DAY' },
  { id: 'location', label: '오시는 길', enLabel: 'LOCATION' },
  { id: 'gallery', label: '갤러리', enLabel: 'GALLERY' },
  { id: 'rsvp', label: '참석 여부', enLabel: 'RSVP' },
  { id: 'guestbook', label: '방명록', enLabel: 'GUESTBOOK' },
  { id: 'account', label: '마음 전하실 곳', enLabel: 'ACCOUNT' }
];

export const App: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Lock body scroll while ribbon opener is active
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpened]);

  return (
    <div className="min-h-screen bg-black flex justify-center selection:bg-white/20 selection:text-white">
      {/* Romantic Photo Lace Envelope Opener */}
      <EnvelopeOpener onOpen={() => setIsOpened(true)} />

      {/* Film Grain Subtle Overlay */}
      <FilmGrain />

      {/* Music Player */}
      <MusicPlayer />

      {/* Header Menu Overlay */}
      <HeaderMenu sections={MENU_SECTIONS} onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Editorial Mobile Container (Target 375/390/414px) */}
      <main className="w-full max-w-mobile bg-[#465F4C] text-white shadow-2xl overflow-x-hidden relative min-h-screen">
        {/* 01. COVER */}
        <CoverSection data={weddingData} />

        {/* 02. INVITATION */}
        <InvitationSection />

        {/* 03. OUR STORY */}
        <OurStorySection data={weddingData} />

        {/* 04. FULLSCREEN PHOTO */}
        <FullscreenPhotoSection data={weddingData} />

        {/* 05. TIMELINE */}
        <TimelineSection data={weddingData} />

        {/* 06. GREEN INTERLUDE */}
        <GreenInterludeSection />

        {/* 07. THE DETAILS */}
        <TheDetailsSection data={weddingData} />

        {/* 08. WEDDING DAY */}
        <WeddingDaySection data={weddingData} />

        {/* 09. LOCATION */}
        <LocationSection data={weddingData} />

        {/* 10. CHAMPAGNE PHOTO */}
        <ChampagnePhotoSection data={weddingData} />

        {/* 11. A NOTE FROM US */}
        <ANoteFromUsSection />

        {/* 12. GALLERY */}
        <GallerySection
          data={weddingData}
          onSelectPhoto={(idx) => setLightboxIndex(idx)}
        />

        {/* 13. RSVP */}
        <RsvpSection />

        {/* 14. GUESTBOOK */}
        <GuestbookSection />

        {/* 15. ACCOUNT */}
        <AccountSection data={weddingData} />

        {/* 16. FINAL */}
        <FinalSection data={weddingData} />
      </main>

      {/* Fullscreen Lightbox Modal */}
      <Lightbox
        images={weddingData.gallery}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />

      {/* Admin Attendance & RSVP Modal for Bride & Groom */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
};

export default App;
