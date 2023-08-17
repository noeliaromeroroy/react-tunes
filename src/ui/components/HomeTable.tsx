import React from 'react';
import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';
import { Avatar, Button, Typography } from '@material-tailwind/react';
import { formatDate } from '../helpers/dateHelper';
import { NavLink } from 'react-router-dom';
import Play from '../../assets/svg/play-icon.svg';
import Pause from '../../assets/svg/pause-icon.svg';
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
          <th key="description">Description</th>
          <th key="released">Released</th>
        </tr>
      </thead>
      <tbody className="max-h-[400px] overflow-scroll">
        {podcasts.map(
          (
            { id, coverImageUrl, title, author, description, releaseDate },
            index,
          ) => {
            return (
              <tr key={id}>
                <td>
                  {activePodcast?.id !== id || activePodcast === undefined ? (
                    <Button
                      className="bg-transparent p-0 y-0"
                      onClick={() => selectPodcast(id)}
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
                <td>{description}</td>
                <td>{formatDate(new Date(releaseDate))}</td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
};
