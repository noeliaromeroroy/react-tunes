import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Input } from '@material-tailwind/react';

import { usePlayerContext } from '../contexts/PlayerContext';

import styles from './MainSearchBar.module.css';
import Back from '../../assets/svg/back-icon.svg';

export const MainSearchBar: React.FC = () => {
  const navigate = useNavigate();

  const { isHome } = usePlayerContext();

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const term = (event.target as HTMLInputElement).value;
      navigate(`/search/${term}`);
    }
  };

  return (
    <div className={styles.MainSearchBar}>
      {!isHome && (
        <div data-cy="back">
          <NavLink to="/" onClick={() => navigate(-1)}>
            <Back />
          </NavLink>
        </div>
      )}

      <Input
        className={`${styles.input}`}
        data-cy="search-podcast"
        placeholder="podcast"
        variant="static"
        labelProps={{
          className: styles.placeholder
        }}
        onKeyDown={handleKeyDown}
        crossOrigin={undefined}
      />
    </div>
  );
};
