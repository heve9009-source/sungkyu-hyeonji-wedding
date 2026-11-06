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
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error('Audio playback error:', err);
        });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />
      <button
        onClick={togglePlay}
        className={`flex items-center gap-1 px-2.5 py-1 text-[9px] tracking-editorial font-serif border border-white/20 bg-black/40 backdrop-blur-sm text-white/90 transition-all duration-300 rounded-none cursor-pointer ${
          isPlaying ? 'border-white/50 bg-white/20 text-white' : 'hover:border-white/40 hover:bg-black/60'
        }`}
        aria-label="Toggle Background Music"
      >
        <Music className={`w-2.5 h-2.5 ${isPlaying ? 'animate-spin' : ''}`} />
        <span>SONG</span>
      </button>
    </>
  );
};
