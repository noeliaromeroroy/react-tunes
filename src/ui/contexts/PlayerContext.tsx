import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import { PlayerContextType } from '../../domain/models/interfaces/iPlayerContext.types';
import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';
import { getPodcastDetail } from '../../infrastructure/services/ITunesPodcastService';

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
  togglePlay: () => {},
  selectPodcast: (id: string) => Promise.resolve(),
  selectEpisode: (podcast: IPodcast, episodeUrl: string) => Promise.resolve(),
  audio: null,
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

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const selectPodcast = async (id: string) => {
    setIsPlaying(false);

    const podcast = await getPodcastDetail(id);
    setActivePodcast(podcast);

    audioRef.current = new Audio(podcast?.episodes[0].episodeUrl);
    audioRef.current.play();
    setIsPlaying(true);
  };

  const selectEpisode = async (podcast: IPodcast, episodeUrl: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setActivePodcast(podcast);
    audioRef.current = new Audio(episodeUrl);
    audioRef.current.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.play();
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
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
        togglePlay,
        selectPodcast,
        selectEpisode,
        audio: audioRef.current,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
