import React, { useEffect, useState } from 'react';

import '../../../assets/styles/index.css';
import { usePlayerContext } from '../../contexts/PlayerContext';
import {
  Avatar,
  Typography,
  Input,
  Select,
  Option,
  Button,
} from '@material-tailwind/react';
import Play from '../../../assets/svg/play-icon.svg';
import Pause from '../../../assets/svg/pause-icon.svg';
import SearchIcon from '../../../assets/svg/search-icon.svg';
import { NavLink } from 'react-router-dom';
import { IPodcast } from '../../../domain/models/interfaces/iPodcast.types';
import { getPodcastDetail } from '../../../infrastructure/services/ITunesPodcastService';

function Search(): JSX.Element {
  const {
    results,
    setIsHome,
    filteredResults,
    setFilteredResults,
    setActivePodcast,
    activePodcast,
    isPlaying,
    setIsPlaying,
    audio,
    setAudio,
  } = usePlayerContext();

  const [orderBy, setOrderBy] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isActiveSearch] = useState(false);

  function togglePlay() {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }

  function playPodcast() {
    setIsPlaying(true);
  }

  function resetPodcast() {
    setActivePodcast(null);
    setIsPlaying(false);
  }

  const selectPodcast = async (id: string) => {
    resetPodcast();

    const podcast = await getPodcastDetail(id);
    setActivePodcast(podcast);
    const newAudio = new Audio(podcast?.episodes[0].episodeUrl);
    setAudio(newAudio);

    playPodcast();
  };

  useEffect(() => {
    setIsHome(true);
  }, []);

  useEffect(() => {
    if (!isActiveSearch) setFilterValue('');
    let filteredResults = results.filter(
      (podcast) =>
        podcast.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        podcast.description.toLowerCase().includes(filterValue.toLowerCase()) ||
        podcast.author.toLowerCase().includes(filterValue.toLowerCase()),
    );
    let sortedData = [...filteredResults];
    switch (orderBy) {
      case 'title':
        sortedData.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'author':
        sortedData.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case 'date':
        sortedData.sort(
          (a, b) =>
            new Date(b.releaseDate).getTime() -
            new Date(a.releaseDate).getTime(),
        );
        break;
      default:
        break;
    }
    setFilteredResults(sortedData);
  }, [orderBy, filterValue, isActiveSearch]);

  return (
    <div>
      <div id="results">
        <div className="flex flex-row justify-end gap-3 w-full">
          {isActiveSearch && (
            <Input
              type="static"
              onChange={(e) => setFilterValue(e.target.value)}
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              name="filterTable"
              crossOrigin=""
              className="text-white !border-none focus:!border-white/50 bg-black/80 focus:!border-none focus:!border-t w-[100px]"
            />
          )}

          <SearchIcon />

          <div>
            <Select
              value={orderBy}
              onChange={(value) => setOrderBy(value || '')}
              className="text-white bg-transparent border-none"
              label="Order by"
              labelProps={{
                className: 'before:content-none after:content-none text-white',
              }}
            >
              <Option value="title">Title</Option>
              <Option value="author">Author</Option>
              <Option value="date">Released Date</Option>
            </Select>
          </div>
        </div>
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
            {filteredResults.map(
              (
                { id, coverImageUrl, title, author, description, releaseDate },
                index,
              ) => {
                const isLast = index === filteredResults.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={id}>
                    <td className="pt-[14px] px-[14px] pb-[19px]">
                      {activePodcast?.id !== id ||
                      activePodcast === undefined ? (
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
                        {releaseDate}
                      </Typography>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Search;
