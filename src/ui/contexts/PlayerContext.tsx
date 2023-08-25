import React, { createContext, useContext, useState, ReactNode } from 'react';

import { PlayerContextType } from '../../domain/models/interfaces/iPlayerContext.types';
import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';

import { useAudioManager } from '../hooks/useAudio';
import { usePlayerControls } from '../hooks/usePlayer';

const PlayerContext = createContext<PlayerContextType>({
  country: null,
  setCountry: (value: React.SetStateAction<string | null>) => null,
  featuredPodcast: [],
  setFeaturedPodcast: (value: React.SetStateAction<IPodcast[]>) => {},
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
  isPlayLoading: false,
  setIsPlayLoading: (value: React.SetStateAction<boolean>) => false,
});

export const usePlayerContext = (): PlayerContextType => {
  return useContext(PlayerContext);
};

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [featuredPodcast, setFeaturedPodcast] = useState<IPodcast[]>([]);
  const [results, setResults] = useState<IPodcast[]>([]);
  const [filteredResults, setFilteredResults] = useState<IPodcast[]>([]);
  const [isHome, setIsHome] = useState<boolean>(true);
  const [previousEpisode, setPreviousEpisode] = useState<string | null>(null);
  const [nextEpisode, setNextEpisode] = useState<string | null>(null);

  const [country, setCountry] = useState<string | null>('the world');

  const {
    isPlaying,
    setIsPlaying,
    isPlayLoading,
    setIsPlayLoading,
    activePodcast,
    setActivePodcast,
    activeEpisodeIndex,
    setActiveEpisodeIndex,
    audioRef,
    togglePlay,
    selectPodcast,
    selectEpisode,
  } = useAudioManager();

  const setCurrentAudio = (newAudio: string) => {
    console.log('entra setcurrent');
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(newAudio);
    audioRef.current.play().finally(() => setIsPlayLoading(false));
  };

  return (
    <PlayerContext.Provider
      value={{
        results,
        setResults,
        featuredPodcast,
        setFeaturedPodcast,
        country,
        setCountry,
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
        isPlayLoading,
        setIsPlayLoading,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
