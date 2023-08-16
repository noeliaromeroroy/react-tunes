import React from 'react';
import SearchIcon from '../../assets/svg/search-icon.svg';
import { Input } from '@material-tailwind/react';
import { searchPodcasts } from '../../infrastructure/services/ITunesPodcastService';
import { usePlayerContext } from '../contexts/PlayerContext';
import { NavLink } from 'react-router-dom';

export const MainSearchBar: React.FC = () => {
  const { setResults, isHome, setFilteredResults } = usePlayerContext();

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      const searchTerm = (event.target as HTMLInputElement).value;
      if (searchTerm) {
        const podcasts = await searchPodcasts(searchTerm);
        setResults(podcasts);
        setFilteredResults(podcasts);
      }
    }
  };

  return (
    <div className="Search">
      {!isHome && <NavLink to="/">Volver</NavLink>}
      <Input
        id="search-podcast"
        placeholder="podcast"
        variant="static"
        onKeyDown={handleKeyDown}
        icon={<SearchIcon />}
        crossOrigin={undefined}
      />
    </div>
  );
};
