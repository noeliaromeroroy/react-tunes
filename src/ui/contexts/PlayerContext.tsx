import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { PlayerContextType } from '../../domain/models/interfaces/iPlayerContext.types';
import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';
import { isPromise } from 'util/types';

const PlayerContext = createContext<PlayerContextType>({
  results: [],
  setResults: (value: React.SetStateAction<IPodcast[]>) => {},
  filteredResults: [],
  setFilteredResults: (value: React.SetStateAction<IPodcast[]>) => {},
  isHome: true,
  setIsHome: (value: React.SetStateAction<boolean>) => true,
  activePodcast: null,
  setActivePodcast: (value: React.SetStateAction<IPodcast | null>) => null,
  isPlaying: false,
  setIsPlaying: (value: React.SetStateAction<boolean>) => false,
  audio: null,
  setAudio: (value: React.SetStateAction<HTMLAudioElement | null>) => null,
});

export const usePlayerContext = (): PlayerContextType => {
  return useContext(PlayerContext);
};

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [results, setResults] = useState<IPodcast[]>([]);
  const [filteredResults, setFilteredResults] = useState<IPodcast[]>([]);
  const [isHome, setIsHome] = useState<boolean>(true);
  const [activePodcast, setActivePodcast] = useState<IPodcast | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    console.log(audio, isPlaying);

    if (isPlaying) {
      if (audio) {
        audio.play();
      }
    } else {
      if (audio) {
        audio.pause();
      }
    }
  }, [isPlaying]);

  return (
    <PlayerContext.Provider
      value={{
        results,
        setResults,
        isHome,
        setIsHome,
        filteredResults,
        setFilteredResults,
        activePodcast,
        setActivePodcast,
        isPlaying,
        setIsPlaying,
        audio,
        setAudio,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
