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
  togglePlay: (podcast?: IPodcast) => {},
  selectPodcast: (id: string) => Promise.resolve(),
  selectEpisode: (podcast: IPodcast, episodeUrl: string) => Promise.resolve(),
  audio: null,
  setCurrentAudio: (newAudio: string) => {},
  activeEpisodeIndex: 0,
  setActiveEpisodeIndex: (episodeIndex: number) => null,
  previousEpisode: null,
  setPreviousEpisode: (value: React.SetStateAction<string | null>) => true,
  nextEpisode: null,
  setNextEpisode: (value: React.SetStateAction<string | null>) => true,
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
  const [activeEpisodeIndex, setActiveEpisodeIndex] = useState<number>(0);
  const [previousEpisode, setPreviousEpisode] = useState<string | null>(null);
  const [nextEpisode, setNextEpisode] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tryPlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.warn('Play interrupted. Retrying in 500ms:', error);
        setTimeout(tryPlay, 500);
      });
    }
  };

  const setCurrentAudio = (newAudio: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(newAudio);
    tryPlay();
  };

  const togglePlay = (podcast?: IPodcast) => {
    if (!activePodcast) if (podcast) selectPodcast(podcast.id);
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const selectPodcast = async (id: string) => {
    setIsPlaying(false);

    const podcast = await getPodcastDetail(id);
    setActivePodcast(podcast);
    setActiveEpisodeIndex(0);
    setPreviousEpisode(null);
    if (activePodcast?.episodes[1].episodeUrl) {
      setNextEpisode(activePodcast.episodes[1].episodeUrl);
    }
    audioRef.current = new Audio(
      podcast?.episodes[activeEpisodeIndex].episodeUrl,
    );
    audioRef.current.play();
    setIsPlaying(true);
  };

  const selectEpisode = async (podcast: IPodcast, episodeUrl: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const index = podcast.episodes.findIndex(
      (episode) => episode.episodeUrl === episodeUrl,
    );

    setActivePodcast(podcast);
    setActiveEpisodeIndex(index);

    if (index === 0 && podcast?.episodes[1].episodeUrl) {
      setNextEpisode(podcast.episodes[1].episodeUrl);
    }
    audioRef.current = new Audio(episodeUrl);
    audioRef.current.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    console.log('useEffect');
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
        setCurrentAudio,
        activeEpisodeIndex,
        setActiveEpisodeIndex,
        previousEpisode,
        setPreviousEpisode,
        nextEpisode,
        setNextEpisode,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
