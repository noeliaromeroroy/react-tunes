import React from 'react';

import '../../../assets/styles/index.css';
import { useSearch } from '../../contexts/PlayerContext';
import { NavLink } from 'react-router-dom';

function Search(): JSX.Element {
  const { results, setIsHome } = useSearch();
  setIsHome(true);

  return (
    <div>
      <div id="results">
        {results.map((podcast) => {
          return (
            <NavLink to={`/detail/${podcast.id}`}>{podcast.title}</NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
