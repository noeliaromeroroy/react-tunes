import React from 'react';
import SearchIcon from '../../assets/svg/search-icon.svg';
import { Input } from '@material-tailwind/react';
import { ITunesPodcastService } from '../../infrastructure/services/ITunesPodcastService';
import { useSearch } from '../contexts/PlayerContext';
import { NavLink } from 'react-router-dom';

const repository = new ITunesPodcastService();

const SearchBar: React.FC = () => {
  const { setResults, isHome } = useSearch();

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      const searchTerm = (event.target as HTMLInputElement).value;
      if (searchTerm) {
        const podcasts = await repository.searchPodcasts(searchTerm);
        setResults(podcasts); // Aquí puedes hacer lo que quieras con los podcasts
      }
    }
  };

  return (
    <div className="Search">
      {!isHome && <NavLink to="/">Volver</NavLink>}
      <Input
        placeholder="podcast"
        variant="static"
        onKeyDown={handleKeyDown}
        icon={<SearchIcon />}
        crossOrigin={undefined}
      />
    </div>
  );
};

export default SearchBar;
