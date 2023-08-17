import React, { useState } from 'react';
import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';
import { Avatar, Button, Typography } from '@material-tailwind/react';
import { formatDate, millisToMinutesAndSeconds } from '../helpers/dateHelper';
import Play from '../../assets/svg/play-icon.svg';
import Pause from '../../assets/svg/pause-icon.svg';
import { usePlayerContext } from '../contexts/PlayerContext';

interface DetailTableProps {
  podcast: IPodcast;
}

export const DetailTable: React.FC<DetailTableProps> = ({ podcast }) => {
  const { isPlaying, togglePlay, selectEpisode } = usePlayerContext();

  const [selectedEpisode, setSelectedEpisode] = useState<string>();

  return (
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
          <th key="duration" className="pt-[14px] px-[14px] pb-[19px]">
            <Typography variant="small">Reloj</Typography>
          </th>
        </tr>
      </thead>
      <tbody className="max-h-[400px] overflow-scroll">
        {podcast.episodes?.map((episode, index) => {
          const isLast = index === podcast.episodes.length - 1;
          const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

          return (
            <tr key={episode.id}>
              <td className="pt-[14px] px-[14px] pb-[19px]">
                {selectedEpisode !== episode.id ? (
                  <Button
                    className="bg-transparent p-0 y-0"
                    onClick={() => {
                      selectEpisode(podcast, episode.episodeUrl);
                      setSelectedEpisode(episode.id);
                    }}
                  >
                    <Play />
                  </Button>
                ) : (
                  <Button
                    className="bg-transparent p-0 y-0"
                    onClick={() => togglePlay()}
                  >
                    {isPlaying ? <Pause /> : <Play />}
                  </Button>
                )}
              </td>
              <td className="pt-[14px] px-[14px] pb-[19px] flex flex-row gap-4">
                <Avatar size="md" variant="rounded" src={episode.cover} />

                <div className="flex flex-col">
                  <Typography className=" text-white">
                    {episode.title.slice(0, 25)}{' '}
                    {episode.title.length > 25 && '...'}
                  </Typography>
                  <Typography variant="small" className="">
                    {podcast.author}
                  </Typography>
                </div>
              </td>
              <td className="pt-[14px] px-[14px] pb-[19px]">
                <Typography variant="small" className="">
                  {episode.topic.slice(0, 30)}{' '}
                  {episode.title.length > 25 && '...'}
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
  );
};
