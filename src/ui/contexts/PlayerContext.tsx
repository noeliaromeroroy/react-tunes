import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PlayerContextType } from '../../domain/models/interfaces/iPlayerContext.types';
import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';

const PlayerContext = createContext<PlayerContextType>({
  results: [],
  setResults: (value: React.SetStateAction<IPodcast[]>) => {},
  isHome: true,
  setIsHome: (value: React.SetStateAction<boolean>) => true,
});

export const useSearch = (): PlayerContextType => {
  return useContext(PlayerContext);
};

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [results, setResults] = useState<IPodcast[]>([]);
  const [isHome, setIsHome] = useState<boolean>(true); // o false, dependiendo de lo que quieras como inicial

  return (
    <PlayerContext.Provider value={{ results, setResults, isHome, setIsHome }}>
      {children}
    </PlayerContext.Provider>
  );
};
