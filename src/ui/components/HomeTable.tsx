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
    <table className="w-full max-w-[832px] max-h-[400px]  table-auto text-left bg-none text-white/30 font-[16px] relative">
      <thead className="sticky top-0">
        <tr>
          <th key="play" className="pt-[14px] px-[14px] pb-[19px]">
            <Typography variant="small">#</Typography>
          </th>
          <th key="title" className="pt-[14px] px-[14px] pb-[19px]">
            <Typography variant="small">Name</Typography>
          </th>
          <th key="description" className="pt-[14px] px-[14px] pb-[19px]">
            <Typography variant="small">Description</Typography>
          </th>
          <th key="released" className="pt-[14px] px-[14px] pb-[19px]">
            <Typography variant="small">Released</Typography>
          </th>
        </tr>
      </thead>
      <tbody className="max-h-[400px] overflow-scroll">
        {podcasts.map(
          (
            { id, coverImageUrl, title, author, description, releaseDate },
            index,
          ) => {
            const isLast = index === podcasts.length - 1;
            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

            return (
              <tr key={id}>
                <td className="pt-[14px] px-[14px] pb-[19px]">
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
                <td className="pt-[14px] px-[14px] pb-[19px] flex flex-row gap-4">
                  <Avatar size="md" variant="rounded" src={coverImageUrl} />

                  <div className="flex flex-col">
                    <NavLink to={`/detail/${id}`} className=" text-white">
                      {title}
                    </NavLink>
                    <Typography variant="small" className="">
                      {author}
                    </Typography>
                  </div>
                </td>
                <td className="pt-[14px] px-[14px] pb-[19px]">
                  <Typography variant="small" className="">
                    {description}
                  </Typography>
                </td>
                <td className="pt-[14px] px-[14px] pb-[19px]">
                  <Typography variant="small" className="">
                    {formatDate(new Date(releaseDate))}
                  </Typography>
                </td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
};
