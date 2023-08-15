import React, { createContext } from 'react';
import { IPodcast } from "./iPodcast.types";

export interface PlayerContextType {
    results: IPodcast[];
    setResults: React.Dispatch<React.SetStateAction<IPodcast[]>>;
    filteredResults: IPodcast[];
    setFilteredResults: React.Dispatch<React.SetStateAction<IPodcast[]>>;
    isHome: boolean;
    setIsHome: React.Dispatch<React.SetStateAction<boolean>>;
}
