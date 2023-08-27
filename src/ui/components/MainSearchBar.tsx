import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Input, Tooltip } from '@material-tailwind/react';

import { usePlayerContext } from '../contexts/PlayerContext';

import styles from './MainSearchBar.module.css';
import Back from '../../assets/svg/back-icon.svg';

export const MainSearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [isEmpty, setIsEmpty] = useState(false);

  const { isHome } = usePlayerContext();

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const term = (event.target as HTMLInputElement).value;
      if (term === '') {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
        navigate(`/search/${term}`);
      }
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
      <Tooltip placement="bottom" open={isEmpty} content={<span>Type a search term</span>} className={styles.tooltip}>
        <Input
          className={`${styles.input}`}
          data-cy="search-podcast"
          placeholder="podcast"
          variant="static"
          onBlur={() => setIsEmpty(false)}
          labelProps={{
            className: styles.placeholder
          }}
          onKeyDown={handleKeyDown}
          crossOrigin={undefined}
        />
      </Tooltip>
    </div>
  );
};
