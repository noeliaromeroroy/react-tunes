import React, { createContext } from 'react';
import { IPodcast } from './iPodcast.types';

export interface PlayerContextType {
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
}