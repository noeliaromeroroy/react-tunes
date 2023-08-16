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

function Detail(): JSX.Element {
  const { id } = useParams();
  const { setIsHome, isPlaying, audio, setIsPlaying } = usePlayerContext();
  const [podcastDetail, setPodcastDetail] = useState<IPodcast>();

  useEffect(() => {
    const getEpisodes = async (id: string) => {
      const podcast = (await getPodcastDetail(id)) || undefined;
      setPodcastDetail(podcast);
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
      <table className="w-full max-w-[832px] max-h-[400px]  table-auto text-left bg-none text-white/30 font-[16px] relative">
        <thead className="sticky top-0">
          <tr>
            <th key="play" className="pt-[14px] px-[14px] pb-[19px]">
              <Typography variant="small">#</Typography>
            </th>
            <th key="title" className="pt-[14px] px-[14px] pb-[19px]">
              <Typography variant="small">Title</Typography>
            </th>
            <th key="description" className="pt-[14px] px-[14px] pb-[19px]">
              <Typography variant="small">Topic</Typography>
            </th>
            <th key="released" className="pt-[14px] px-[14px] pb-[19px]">
              <Typography variant="small">Released</Typography>
            </th>
            <th key="released" className="pt-[14px] px-[14px] pb-[19px]">
              <Typography variant="small">Reloj</Typography>
            </th>
          </tr>
        </thead>
        <tbody className="max-h-[400px] overflow-scroll">
          {podcastDetail?.episodes.map((episode, index) => {
            const isLast = index === podcastDetail.episodes.length - 1;
            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

            return (
              <tr key={id}>
                <td className="pt-[14px] px-[14px] pb-[19px]">
                  <Typography variant="small" className="font-medium">
                    <Play />
                  </Typography>
                </td>
                <td className="pt-[14px] px-[14px] pb-[19px] flex flex-row gap-4">
                  <Avatar size="md" variant="rounded" src={episode.cover} />

                  <div className="flex flex-col">
                    <Typography className=" text-white">
                      {episode.title}
                    </Typography>
                    <Typography variant="small" className="">
                      {podcastDetail?.author}
                    </Typography>
                  </div>
                </td>
                <td className="pt-[14px] px-[14px] pb-[19px]">
                  <Typography variant="small" className="">
                    {episode.topic}
                  </Typography>
                </td>
                <td className="pt-[14px] px-[14px] pb-[19px]">
                  <Typography variant="small" className="">
                    {formatDate(episode.releaseDate)}
                  </Typography>
                </td>
                <td className="pt-[14px] px-[14px] pb-[19px]">
                  <Typography variant="small" className="">
                    {millisToMinutesAndSeconds(episode.duration)}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Detail;
