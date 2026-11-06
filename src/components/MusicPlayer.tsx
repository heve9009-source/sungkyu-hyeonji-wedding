import React, { useState, useRef } from 'react';
import { Music } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Audio playback error:", err);
      });
    }
  };

  return (
    <div className="fixed top-6 right-20 z-[90]">
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />
      <button
        onClick={togglePlay}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-editorial font-serif border border-white/20 bg-[#465F4C]/85 backdrop-blur-sm text-white/90 transition-all duration-300 ${
          isPlaying ? 'border-white/40 bg-white/15 text-white' : 'hover:border-white/40'
        }`}
        aria-label="Toggle Background Music"
      >
        <Music className={`w-3 h-3 ${isPlaying ? 'animate-spin' : ''}`} />
        <span>♪ OUR SONG</span>
      </button>
    </div>
  );
};
