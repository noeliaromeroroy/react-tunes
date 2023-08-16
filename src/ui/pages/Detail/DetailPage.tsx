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
  const { setIsHome, isPlaying, audio, setIsPlaying } = usePlayerContext();
  const [podcastDetail, setPodcastDetail] = useState<IPodcast>();

  const [orderBy, setOrderBy] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isActiveSearch, setIsActiveSearch] = useState(false);

  const [filteredDetailResults, setFilteredDetailResults] = useState<
    IEpisode[] | undefined
  >([]);

  useEffect(() => {
    if (!isActiveSearch) setFilterValue('');
    if (podcastDetail?.episodes != null) {
      let filteredResults = podcastDetail?.episodes.filter(
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
      const podcast = (await getPodcastDetail(id)) || undefined;
      setPodcastDetail(podcast);
      setFilteredDetailResults(podcast?.episodes);
    };

    setIsHome(false);
    if (id != null) {
      getEpisodes(id);
    }
  }, []);

  return (
    <div>
      <h1>{podcastDetail?.title}</h1>
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

        <DetailTable
          episodes={filteredDetailResults}
          author={podcastDetail?.author}
        />
      </div>
    </div>
  );
}

export default Detail;
