import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Spinner } from '@material-tailwind/react';

import { usePlayerContext } from '../../contexts/PlayerContext';
import { SubSearchBar } from '../../components/SubSearchBar';
import { HomeTable } from '../../components/HomeTable';
import '../../../assets/styles/index.css';
import { useFilteredAndSortedPodcasts } from '../../hooks/usePodcast';
import Confused from '../../../assets/svg/confused.svg';

import { useSearchLogic } from '../../hooks/useSearchLogic';

import styles from './SearchPage.module.css';

function Search(): JSX.Element {
  const { results, filteredResults, setFilteredResults, setIsHome } = usePlayerContext();

  const { term } = useParams();

  const [orderBy, setOrderBy] = useState('');
  const [isLoading] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [isActiveSearch, setIsActiveSearch] = useState(false);

  useFilteredAndSortedPodcasts(results, orderBy, filterValue, isActiveSearch, setFilteredResults);

  const { loadMore, search } = useSearchLogic(term);

  useEffect(() => {
    search();
    setIsHome(false);
  }, []);

  return isLoading ? (
    <div className={styles.loader}>
      <Spinner className={styles.spinner} color="indigo" />
    </div>
  ) : filteredResults.length > 0 ? (
    <div className="pb-[200px]">
      <SubSearchBar
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        setFilterValue={setFilterValue}
        isActiveSearch={isActiveSearch}
        setIsActiveSearch={setIsActiveSearch}
        options={[
          { value: 'title', label: 'Title' },
          { value: 'author', label: 'Author' },
          { value: 'date', label: 'Date' }
        ]}
      />
      <HomeTable podcasts={filteredResults} />
      <Button data-cy="search-load-more" onClick={() => loadMore()}>
        Load More
      </Button>
    </div>
  ) : (
    <div className={styles.noResults}>
      <Confused />
      <p>No results found.</p>
      <p>Try again with other search term.</p>
    </div>
  );
}

export default Search;
