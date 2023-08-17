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
    <table className="Table">
      <thead>
        <tr>
          <th key="play">#</th>
          <th key="title">Title</th>
          <th key="description" className="hidden md:table-cell">
            Topic
          </th>
          <th key="released" className="hidden sm:table-cell">
            Released
          </th>
          <th key="duration" className="hidden sm:table-cell">
            Reloj
          </th>
        </tr>
      </thead>
      <tbody>
        {podcast.episodes?.map((episode) => {
          return (
            <tr key={episode.id}>
              <td>
                {selectedEpisode !== episode.id ? (
                  <Button
                    className="bg-transparent p-3 rounded-full"
                    onClick={() => {
                      selectEpisode(podcast, episode.episodeUrl);
                      setSelectedEpisode(episode.id);
                    }}
                  >
                    <Play />
                  </Button>
                ) : (
                  <Button
                    className={`${
                      isPlaying ? 'bg-active' : 'bg-transparent'
                    } p-3 rounded-full`}
                    onClick={() => togglePlay()}
                  >
                    {isPlaying ? <Pause /> : <Play />}
                  </Button>
                )}
              </td>
              <td className="info">
                <Avatar size="md" variant="rounded" src={episode.cover} />
                <div className="flex flex-col">
                  <Typography className="font-medium text-white">
                    {episode.title.slice(0, 25)}{' '}
                    {episode.title.length > 25 && '...'}
                  </Typography>

                  {podcast.author}
                </div>
              </td>
              <td className="hidden md:table-cell">
                {episode.topic.slice(0, 35)}{' '}
                {episode.title.length > 35 && '...'}
              </td>
              <td className="hidden sm:table-cell">
                {formatDate(episode.releaseDate)}
              </td>
              <td className="hidden sm:table-cell">
                {millisToMinutesAndSeconds(episode.duration)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
