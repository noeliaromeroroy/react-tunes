import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../../assets/styles/index.css';
import { useSearch } from '../../contexts/PlayerContext';
import { getPodcastDetail } from '../../../infrastructure/services/ITunesPodcastService';
import { IPodcast } from '../../../domain/models/interfaces/iPodcast.types';

function Detail(): JSX.Element {
  const { id } = useParams();
  const { setIsHome } = useSearch();
  const [podcastDetail, setPodcastDetail] = useState<IPodcast>();

  useEffect(() => {
    const getEpisodes = async (id: string) => {
      const podcast = await getPodcastDetail(id);
      setPodcastDetail(podcast);
    };

    setIsHome(false);
    if (id != null) {
      getEpisodes(id);
    }
  }, []);

  return (
    <div>
      <span>{podcastDetail?.title}</span>
      <span>------------</span>
      <ul>
        {podcastDetail?.episodes.map((episode, index) => (
          <li key={index}>
            <div>trackName: {episode.title}</div>
            <div>description: {episode.topic}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Detail;
