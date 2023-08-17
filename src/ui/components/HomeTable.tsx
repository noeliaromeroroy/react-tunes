import React from 'react';
import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';
import { Avatar, Button, Typography } from '@material-tailwind/react';
import { formatDate } from '../helpers/dateHelper';
import { NavLink } from 'react-router-dom';
import Play from '../../assets/svg/play-icon-sm.svg';
import Pause from '../../assets/svg/pause-icon-sm.svg';
import { usePlayerContext } from '../contexts/PlayerContext';

interface HomeTableProps {
  podcasts: IPodcast[];
}

export const HomeTable: React.FC<HomeTableProps> = ({ podcasts }) => {
  const { activePodcast, isPlaying, togglePlay, selectPodcast } =
    usePlayerContext();

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
        {podcasts.map(
          ({ id, coverImageUrl, title, author, description, releaseDate }) => {
            return (
              <tr key={id}>
                <td>
                  {activePodcast?.id !== id || activePodcast === undefined ? (
                    <Button
                      className="bg-transparent p-0 y-0"
                      onClick={() => selectPodcast(id)}
                      id={`play-${id}`}
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
                <td className="info">
                  <Avatar size="md" variant="rounded" src={coverImageUrl} />

                  <div className="flex flex-col">
                    <NavLink to={`/detail/${id}`} className=" text-white">
                      {title}
                    </NavLink>
                    <Typography className="text-sm font-medium">
                      {author}
                    </Typography>
                  </div>
                </td>
                <td className="hidden md:table-cell">{description}</td>
                <td className="hidden sm:table-cell">
                  {formatDate(new Date(releaseDate))}
                </td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
};
