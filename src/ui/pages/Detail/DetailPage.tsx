import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../../assets/styles/index.css';
import { usePlayerContext } from '../../contexts/PlayerContext';
import { getPodcastDetail } from '../../../infrastructure/services/ITunesPodcastService';
import { IPodcast } from '../../../domain/models/interfaces/iPodcast.types';
import { Avatar, Typography } from '@material-tailwind/react';
import Play from '../../../assets/svg/play-icon.svg';
import {
  formatDate,
  millisToMinutesAndSeconds,
} from '../../helpers/dateHelper';
import { SubSearchBar } from '../../components/SubSearchBar';
import { IEpisode } from '../../../domain/models/interfaces/iEpisode.types';
import { DetailTable } from '../../components/DetailTable';

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
    if (activePodcast?.episodes != null) {
      let filteredResults = activePodcast?.episodes.filter(
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
    <div>
      {detailedPodcast && (
        <>
          <h1>{detailedPodcast.title}</h1>
          <img src={detailedPodcast.coverImageUrl} />
          <p>------------</p>
          <div id="results">
            <SubSearchBar
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              setFilterValue={setFilterValue}
              isActiveSearch={isActiveSearch}
              setIsActiveSearch={setIsActiveSearch}
              options={[
                { value: 'title', label: 'Title' },
                { value: 'date', label: 'Released Date' },
                { value: 'duration', label: 'Duration' },
              ]}
            />

            <DetailTable podcast={detailedPodcast} />
          </div>
        </>
      )}
    </div>
  );
}

export default Detail;
