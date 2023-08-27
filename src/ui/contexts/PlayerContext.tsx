import React, { createContext, useContext, useState, ReactNode } from 'react';

import { PlayerContextType } from '../interfaces/iContexts';
import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';

import { useAudioManager } from '../hooks/useAudio';

const PlayerContext = createContext<PlayerContextType>({
  country: null,
  setCountry: () => null,
  featuredPodcast: [],
  setFeaturedPodcast: () => {},
  results: [],
  setResults: () => {},
  filteredResults: [],
  setFilteredResults: () => {},
  isHome: true,
  setIsHome: () => true,
  activePodcast: null,
  setActivePodcast: () => null,
  isPlaying: false,
  setIsPlaying: () => false,
  togglePlay: () => {},
  selectPodcast: () => Promise.resolve(),
  selectEpisode: () => Promise.resolve(),
  audio: null,
  setCurrentAudio: () => {},
  activeEpisodeIndex: 0,
  setActiveEpisodeIndex: () => null,
  previousEpisode: null,
  setPreviousEpisode: () => true,
  nextEpisode: null,
  setNextEpisode: () => true,
  isPlayLoading: false,
  setIsPlayLoading: () => false,
  isSearching: false,
  setIsSearching: () => false,
  searchTerm: null,
  setSearchTerm: () => null
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
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string | null>('');

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
    selectEpisode
  } = useAudioManager();

  const setCurrentAudio = (newAudio: string) => {
    setIsPlayLoading(true);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(newAudio);

    audioRef.current.play().finally(() => setIsPlayLoading(false));

    setIsPlaying(true);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const props = {
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
    isSearching,
    setIsSearching,
    searchTerm,
    setSearchTerm
  };
  return <PlayerContext.Provider value={props}>{children}</PlayerContext.Provider>;
};
