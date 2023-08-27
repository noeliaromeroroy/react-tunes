import React from 'react';
import { Avatar, Button, Typography } from '@material-tailwind/react';

import { usePlayerContext } from '../contexts/PlayerContext';
import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';
import { IEpisode } from '../../domain/models/interfaces/iEpisode.types';
import { formatDate, millisToMinutesAndSeconds } from '../helpers/dateHelper';
import Play from '../../assets/svg/play-icon-sm.svg';
import Clock from '../../assets/svg/clock-icon.svg';

interface DetailTableProps {
  podcast: IPodcast;
  filteredEpisodes: IEpisode[] | undefined;
}

export const DetailTable: React.FC<DetailTableProps> = ({ podcast, filteredEpisodes }) => {
  const { selectEpisode, isPlayLoading } = usePlayerContext();

  return (
    <table className="Table" data-cy={`detail-${podcast.id}`}>
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
            <Clock />
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredEpisodes?.map((episode) => {
          return (
            <tr key={episode.id}>
              <td>
                <Button
                  className="rounded-full bg-transparent p-3"
                  data-cy={`play-detail-${episode.id}`}
                  disabled={isPlayLoading}
                  onClick={() => {
                    selectEpisode(podcast, episode.episodeUrl);
                  }}
                >
                  <Play />
                </Button>
              </td>
              <td className="info">
                <Avatar size="md" variant="rounded" src={episode.cover} />
                <div className="flex flex-col">
                  <Typography className="font-medium text-white">
                    {episode.title.slice(0, 25)} {episode.title.length > 25 && '...'}
                  </Typography>

                  {podcast.author}
                </div>
              </td>
              <td className="hidden md:table-cell">
                {episode.topic.slice(0, 35)} {episode.title.length > 35 && '...'}
              </td>
              <td className="hidden sm:table-cell">{formatDate(episode.releaseDate)}</td>
              <td className="hidden sm:table-cell">{millisToMinutesAndSeconds(episode.duration)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
