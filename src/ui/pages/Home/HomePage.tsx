import { useState } from 'react';

import { usePlayerContext } from '../../contexts/PlayerContext';
import { SubSearchBar } from '../../components/SubSearchBar';
import { HomeTable } from '../../components/HomeTable';
import { IPodcast } from '../../../domain/models/interfaces/iPodcast.types';
import '../../../assets/styles/index.css';
import { Spinner } from '@material-tailwind/react';
import CardPodcast from '../../components/CardPodcast';
import {
  useFeaturedPodcasts,
  useFilteredAndSortedPodcasts,
} from '../../hooks/usePodcast';

import styles from './HomePage.module.css';

function Search(): JSX.Element {
  const {
    results,
    filteredResults,
    setFilteredResults,
    featuredPodcast,
    country,
  } = usePlayerContext();

  const { isLoading } = useFeaturedPodcasts();

  const [orderBy, setOrderBy] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isActiveSearch, setIsActiveSearch] = useState(false);

  useFilteredAndSortedPodcasts(
    results,
    orderBy,
    filterValue,
    isActiveSearch,
    setFilteredResults,
  );

  return (
    <div id="HomePage">
      {filteredResults.length > 0 ? (
        <>
          <SubSearchBar
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            setFilterValue={setFilterValue}
            isActiveSearch={isActiveSearch}
            setIsActiveSearch={setIsActiveSearch}
            options={[
              { value: 'title', label: 'Title' },
              { value: 'author', label: 'Author' },
              { value: 'date', label: 'Date' },
            ]}
          />
          <HomeTable podcasts={filteredResults} />
        </>
      ) : (
        <>
          {isLoading ? (
            <div className={styles.loader}>
              <Spinner className={styles.spinner} color="indigo" />
            </div>
          ) : (
            <div>
              <h1>The latest podcasts on {country}</h1>
              <div className={styles.featuredPodcast}>
                {featuredPodcast &&
                  featuredPodcast.map((podcast: IPodcast) => {
                    return <CardPodcast {...podcast} key={podcast.id} />;
                  })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Search;
