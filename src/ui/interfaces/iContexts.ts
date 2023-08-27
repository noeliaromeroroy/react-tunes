import React from 'react';
import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';

export enum ErrorTypes {
  PLAY_ERROR = 'PLAY_ERROR',
  LOCATION_ERROR = 'LOCATION_ERROR',
  GET_PODCAST = 'GET_PODCAST',
  FILTER_PODCAST = 'FILTER_PODCAST',
  SEARCH_PODCAST = 'SEARCH_PODCAST'
}

export const ErrorTitles: { [key in ErrorTypes]: string } = {
  PLAY_ERROR: 'Error playing podcast',
  LOCATION_ERROR: 'Error getting location',
  GET_PODCAST: 'Error getting podcast',
  FILTER_PODCAST: 'Error filtering podcast',
  SEARCH_PODCAST: 'Error searching podcast'
};

export interface CustomError {
  type: ErrorTypes;
  message: string;
}

export interface ErrorContextType {
  error: Error | CustomError | null;
  setError: React.Dispatch<React.SetStateAction<Error | CustomError | null>>;
}

export interface PlayerContextType {
  featuredPodcast: IPodcast[];
  setFeaturedPodcast: React.Dispatch<React.SetStateAction<IPodcast[]>>;
  country: string | null;
  setCountry: (country: string | null) => void;
  results: IPodcast[];
  setResults: React.Dispatch<React.SetStateAction<IPodcast[]>>;
  filteredResults: IPodcast[];
  setFilteredResults: React.Dispatch<React.SetStateAction<IPodcast[]>>;
  isHome: boolean;
  setIsHome: React.Dispatch<React.SetStateAction<boolean>>;
  activePodcast: IPodcast | null;
  setActivePodcast: React.Dispatch<React.SetStateAction<IPodcast | null>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  togglePlay: (podcast?: IPodcast) => void;
  selectPodcast: (id: string) => Promise<void>;
  selectEpisode: (podcast: IPodcast, episodeUrl: string) => Promise<void>;
  audio: HTMLAudioElement | null;
  setCurrentAudio: (newAudio: string) => void;
  activeEpisodeIndex: number;
  setActiveEpisodeIndex: (episodeIndex: number) => void;
  previousEpisode: string | null;
  setPreviousEpisode: (episodeUrl: string | null) => void;
  nextEpisode: string | null;
  setNextEpisode: (episodeUrl: string | null) => void;
  isPlayLoading: boolean;
  setIsPlayLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CacheContextType {
  podcastMap: Map<string, IPodcast> | null;
  setPodcastMap: React.Dispatch<React.SetStateAction<Map<string, IPodcast> | null>>;
}
