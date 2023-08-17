import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { usePlayerContext } from '../../contexts/PlayerContext';
import { IPodcast } from '../../../domain/models/interfaces/iPodcast.types';
import { IEpisode } from '../../../domain/models/interfaces/iEpisode.types';
import { getPodcastDetail } from '../../../infrastructure/services/ITunesPodcastService';
import { SubSearchBar } from '../../components/SubSearchBar';
import { DetailTable } from '../../components/DetailTable';
import styles from './DetailPage.module.css';
import '../../../assets/styles/index.css';

function Detail(): JSX.Element {
  const { id } = useParams();
  const { setIsHome, activePodcast } = usePlayerContext();

  const [orderBy, setOrderBy] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const [detailedPodcast, setDetailedPodcast] = useState<IPodcast>();

  const [filteredDetailResults, setFilteredDetailResults] = useState<
    IEpisode[] | undefined
  >([]);

  useEffect(() => {
    if (!isActiveSearch) setFilterValue('');
    if (detailedPodcast?.episodes != null) {
      let filteredResults = detailedPodcast?.episodes.filter(
        (episode) =>
          episode.title.toLowerCase().includes(filterValue.toLowerCase()) ||
          episode.topic.toLowerCase().includes(filterValue.toLowerCase()),
      );
      let sortedData = [...filteredResults];

      switch (orderBy) {
        case 'title':
          sortedData.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'date':
          sortedData.sort(
            (a, b) =>
              new Date(b.releaseDate).getTime() -
              new Date(a.releaseDate).getTime(),
          );
          break;
        case 'duration':
          sortedData.sort((a, b) => a.duration - b.duration);
          break;

        default:
          break;
      }
      setFilteredDetailResults(sortedData);
    }
  }, [orderBy, filterValue, isActiveSearch]);

  useEffect(() => {
    const getEpisodes = async (id: string) => {
      const podcast = (await getPodcastDetail(id)) || null;
      if (podcast != null) {
        setDetailedPodcast(podcast);
        setFilteredDetailResults(podcast?.episodes);
      }
    };

    setIsHome(false);
    if (id != null) {
      getEpisodes(id);
    }
  }, []);

  return (
    <>
      {detailedPodcast && (
        <div className={styles.DetailedPage} id="DetailedPage">
          <img
            className={styles.featuredImage}
            src={detailedPodcast.coverImageUrl}
            alt={detailedPodcast.title}
          />

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
              { value: 'duration', label: 'Duration' },
            ]}
          />

          <DetailTable
            podcast={detailedPodcast}
            filteredEpisodes={filteredDetailResults}
          />
        </div>
      )}
    </>
  );
}

export default Detail;
