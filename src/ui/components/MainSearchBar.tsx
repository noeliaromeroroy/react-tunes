import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Input } from '@material-tailwind/react';

import { usePlayerContext } from '../contexts/PlayerContext';
import { searchPodcasts } from '../../infrastructure/services/ITunesPodcastService';
import styles from './MainSearchBar.module.css';
import Back from '../../assets/svg/back-icon.svg';

export const MainSearchBar: React.FC = () => {
  const navigate = useNavigate();
  const { results, setResults, isHome, setFilteredResults } =
    usePlayerContext();

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      const searchTerm = (event.target as HTMLInputElement).value;
      if (searchTerm) {
        const podcasts = await searchPodcasts(searchTerm);
        setResults(podcasts);
        setFilteredResults(podcasts);
        navigate('/');
      }
    }
  };

  return (
    <div className={styles.MainSearchBar}>
      {!isHome ? (
        <div data-cy="back-to-home">
          <NavLink to="/">
            <Back />
          </NavLink>
        </div>
      ) : (
        results.length > 0 && (
          <div data-cy="back-to-home">
            <NavLink to="/" onClick={() => navigate(0)}>
              <Back />
            </NavLink>
          </div>
        )
      )}
      <Input
        className={`${styles.input} placeholder-gray`}
        data-cy="search-podcast"
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
