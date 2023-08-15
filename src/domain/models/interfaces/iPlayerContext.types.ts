import React, { createContext } from 'react';
import { IPodcast } from "./iPodcast.types";

export interface PlayerContextType {
    results: IPodcast[];
    setResults: React.Dispatch<React.SetStateAction<IPodcast[]>>;
    isHome: boolean;
    setIsHome: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlayerContext = createContext<PlayerContextType>({
    results: [],
    setResults: (value: React.SetStateAction<IPodcast[]>) => { },
    isHome: true,
    setIsHome: (value: React.SetStateAction<boolean>) => { }
});