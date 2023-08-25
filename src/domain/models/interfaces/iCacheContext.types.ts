import React, { createContext } from 'react';
import { IPodcast } from './iPodcast.types';

export interface CacheContextType {
    podcastMap: Map<string, IPodcast> | null;
    setPodcastMap: React.Dispatch<React.SetStateAction<Map<string, IPodcast> | null>>;

}