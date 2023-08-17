import React from 'react';
import { Input, Select, Option, Button } from '@material-tailwind/react';
import SearchIcon from '../../assets/svg/search-icon.svg';
import { usePlayerContext } from '../contexts/PlayerContext';

import styles from './SubSearchBar.module.css';
import Verified from '../../assets/svg/verified.svg';
import Play from '../../assets/svg/play-icon.svg';
import Pause from '../../assets/svg/pause-icon.svg';
import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';

interface SubSearchBarProps {
  orderBy: string;
  setOrderBy: Function;
  setFilterValue: Function;
  isActiveSearch: boolean;
  setIsActiveSearch: Function;
  options: Array<{ value: string; label: string }>;
  podcast?: IPodcast;
}

export const SubSearchBar: React.FC<SubSearchBarProps> = ({
  orderBy,
  setOrderBy,
  setFilterValue,
  isActiveSearch,
  setIsActiveSearch,
  options,
  podcast,
}) => {
  const toggleActiveSearch = () => {
    setIsActiveSearch((prevState: any) => !prevState);
  };

  const { isPlaying, togglePlay } = usePlayerContext();

  return (
    <div id="SubSearchBar" className={styles.SubSearchBar}>
      <div
        className={`${styles.containerSearch} ${podcast ? 'flex-grow' : ''}`}
      >
        {podcast && (
          <div className={`${styles.podcastTitle} pt-2`}>
            <Button
              className={styles.buttonHead}
              onClick={() => togglePlay(podcast)}
            >
              {isPlaying ? <Pause /> : <Play />}
            </Button>
            <h1>{podcast.title}</h1>
            <Verified />
          </div>
        )}

        {isActiveSearch && (
          <Input
            type="static"
            placeholder="search in results"
            onChange={(e) => setFilterValue(e.target.value)}
            labelProps={{
              className: 'labelInput',
            }}
            name="filterTable"
            crossOrigin=""
            className="input placeholderGray absolute"
          />
        )}

        <div
          onClick={() => {
            toggleActiveSearch();
          }}
        >
          <SearchIcon />
        </div>
      </div>
      <div className={styles.orderContainer}>
        <Select
          value={orderBy}
          onChange={(value) => setOrderBy(value || '')}
          className={`${styles.selectOrder} placeholderGray`}
          label="Order by"
          labelProps={{
            className: 'labelInput',
          }}
        >
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};
