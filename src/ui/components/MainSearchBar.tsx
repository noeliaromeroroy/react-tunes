import React from 'react';
import Back from '../../assets/svg/back-icon.svg';
import { Input } from '@material-tailwind/react';
import { searchPodcasts } from '../../infrastructure/services/ITunesPodcastService';
import { usePlayerContext } from '../contexts/PlayerContext';
import { NavLink } from 'react-router-dom';
import styles from './MainSearchBar.module.css';

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
    <div className={styles.MainSearchBar}>
      {!isHome && (
        <NavLink to="/">
          <Back />
        </NavLink>
      )}
      <Input
        className={`${styles.input} placeholder-gray`}
        id="search-podcast"
        placeholder="podcast"
        variant="static"
        labelProps={{
          className: styles.placeholder,
        }}
        onKeyDown={handleKeyDown}
        crossOrigin={undefined}
      />
    </div>
  );
};
