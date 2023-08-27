import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Button, Typography } from '@material-tailwind/react';

import { usePlayerContext } from '../contexts/PlayerContext';
import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';
import { formatDate } from '../helpers/dateHelper';
import Play from '../../assets/svg/play-icon-sm.svg';
import Pause from '../../assets/svg/pause-icon-sm.svg';

interface HomeTableProps {
  podcasts: IPodcast[];
}

export const HomeTable: React.FC<HomeTableProps> = ({ podcasts }) => {
  const { activePodcast, isPlaying, togglePlay, selectPodcast, isPlayLoading } = usePlayerContext();

  return (
    <table className="Table">
      <thead>
        <tr>
          <th key="play">#</th>
          <th key="title">Name</th>
          <th key="description" className="hidden md:table-cell">
            Description
          </th>
          <th key="released" className="hidden sm:table-cell">
            Released
          </th>
        </tr>
      </thead>
      <tbody>
        {podcasts.map(({ id, coverImageUrl, title, author, description, releaseDate }) => {
          return (
            <tr key={id}>
              <td>
                {activePodcast?.id !== id || activePodcast === undefined ? (
                  <Button
                    className="bg-transparent p-0"
                    data-cy={`play-${id}`}
                    onClick={() => selectPodcast(id)}
                    id={`play-${id}`}
                    disabled={isPlayLoading}
                  >
                    <Play />
                  </Button>
                ) : (
                  <Button
                    data-cy={`play-${id}`}
                    className="bg-transparent p-0"
                    onClick={() => togglePlay()}
                    disabled={isPlayLoading}
                  >
                    {isPlaying ? <Pause /> : <Play />}
                  </Button>
                )}
              </td>
              <td className="info">
                <Avatar size="md" variant="rounded" src={coverImageUrl} />

                <div className="flex flex-col">
                  <NavLink to={`/detail/${id}`} className=" text-white" data-cy={`title-podcast-${id}`}>
                    {title}
                  </NavLink>
                  <Typography className="text-sm font-medium">{author}</Typography>
                </div>
              </td>
              <td className="hidden md:table-cell">{description}</td>
              <td className="hidden sm:table-cell">{formatDate(new Date(releaseDate))}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
