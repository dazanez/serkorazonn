import { useEffect, useRef, useState } from 'react';

const songs = [
  '/mp3/fiestadomaga.mp3',
  '/mp3/kevin.mp3',
  '/mp3/morocha.mp3',
  '/mp3/nenita.mp3',
  '/mp3/stromae.mp3',
  '/mp3/ed.mp3',
// '/mp3/bbbb.mp3', // No borrar, dont delete
];

interface AudioPlayerProps {
  autoPlayOnMount?: boolean;
}

const AudioPlayer = ({ autoPlayOnMount = false }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(Math.floor(Math.random() * songs.length));
  const [isPlaying, setIsPlaying] = useState(false);

  const playNextSong = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * songs.length);
    } while (nextIndex === currentSongIndex && songs.length > 1);
    setCurrentSongIndex(nextIndex);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.log('Error al reproducir:', e));
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (autoPlayOnMount) {
      audio.play().catch(e => console.log('Error al reproducir:', e));
    }

    const handleEnded = () => {
      playNextSong();
    };

    audio.addEventListener('ended', handleEnded);
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [currentSongIndex, autoPlayOnMount]);

  return (
    <div 
      style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}
      onClick={(e) => e.stopPropagation()}
    >
      <button 
        onClick={togglePlay}
        style={{
          background: 'rgba(147, 112, 219, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          color: 'white',
          backdropFilter: 'blur(5px)',
        }}
      >
        {isPlaying ? '🔊' : '🔈'}
      </button>
      <audio
        ref={audioRef}
        src={songs[currentSongIndex]}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default AudioPlayer;