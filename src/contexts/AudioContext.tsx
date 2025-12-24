import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

interface AudioContextType {
  isPlaying: boolean;
  startAudio: () => void;
  toggleAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
};

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5; // Volume à 50%
      audio.loop = true; // Boucle infinie

      // Écouter les changements d'état de l'audio
      const updatePlayingState = () => {
        setIsPlaying(!audio.paused);
      };

      audio.addEventListener("play", updatePlayingState);
      audio.addEventListener("pause", updatePlayingState);

      return () => {
        audio.removeEventListener("play", updatePlayingState);
        audio.removeEventListener("pause", updatePlayingState);
      };
    }
  }, []);

  const startAudio = () => {
    const audio = audioRef.current;
    if (audio && audio.paused) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, startAudio, toggleAudio }}>
      <audio ref={audioRef} src="/feliz-navidad.mp3" />
      {children}
    </AudioContext.Provider>
  );
};

