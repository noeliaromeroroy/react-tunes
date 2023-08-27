import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import { SubSearchBar } from '../../components/SubSearchBar';
import { DetailTable } from '../../components/DetailTable';
import styles from './DetailPage.module.css';
import '../../../assets/styles/index.css';
import { useFilteredAndSortedEpisodes } from '../../hooks/useEpisode';
import { usePodcastDetails } from '../../hooks/usePodcast';

function Detail(): JSX.Element {
  const { id } = useParams();

  const [orderBy, setOrderBy] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isActiveSearch, setIsActiveSearch] = useState(false);

  const detailedPodcast = usePodcastDetails(id);

  const filteredDetailResults = useFilteredAndSortedEpisodes(
    detailedPodcast?.episodes,
    orderBy,
    filterValue,
    isActiveSearch
  );

  return (
    <div className={styles.DetailedPage} id="DetailedPage">
      {detailedPodcast && (
        <>
          <img className={styles.featuredImage} src={detailedPodcast.coverImageUrl} alt={detailedPodcast.title} />
          <SubSearchBar
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            setFilterValue={setFilterValue}
            isActiveSearch={isActiveSearch}
            podcast={detailedPodcast}
            setIsActiveSearch={setIsActiveSearch}
            options={[
              { value: 'title', label: 'Title' },
              { value: 'date', label: 'Date' },
              { value: 'duration', label: 'Duration' }
            ]}
          />
          <DetailTable podcast={detailedPodcast} filteredEpisodes={filteredDetailResults} />
        </>
      )}
    </div>
  );
}

export default Detail;
