

import React, { createContext } from 'react';
import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';



export interface CustomError {
    type: string;
    message: string;
}


export interface ErrorContextType {
    error: Error | CustomError | null,
    setError: React.Dispatch<React.SetStateAction<Error | CustomError | null>>
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
    isSearching: boolean;
    setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
    searchTerm: string | null;
    setSearchTerm: (searchTerm: string | null) => void;
}

export interface CacheContextType {
    podcastMap: Map<string, IPodcast> | null;
    setPodcastMap: React.Dispatch<React.SetStateAction<Map<string, IPodcast> | null>>;

}