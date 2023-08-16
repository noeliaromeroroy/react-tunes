import { Avatar, Progress, Button } from '@material-tailwind/react';
import Shufle from '../../assets/svg/shuffle-icon.svg';
import Previous from '../../assets/svg/previous-icon.svg';
import Pause from '../../assets/svg/pause-icon.svg';
import Play from '../../assets/svg/play-icon.svg';
import Repeat from '../../assets/svg/repeat-icon.svg';
import Next from '../../assets/svg/next-icon.svg';
import Volume from '../../assets/svg/volume-icon.svg';
import styles from './PlayerBar.module.css';
import { usePlayerContext } from '../contexts/PlayerContext';
import { useEffect, useState } from 'react';

const PlayerBar: React.FC = () => {
  const { activePodcast, isPlaying, setIsPlaying } = usePlayerContext();

  function togglePlay() {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }

  return (
    <div className={styles.PlayerBar}>
      <div className={styles.podcastDetail}>
        {activePodcast && (
          <>
            <Avatar
              size="xxl"
              variant="square"
              src={activePodcast.coverImageUrl}
            />
            <div className="flex flex-col justify-center">
              <div className={styles.podcastTitl}>{activePodcast.title}</div>
              <div className={styles.podcastAuthor}>{activePodcast.author}</div>
            </div>
          </>
        )}
      </div>

      <div
        className={`${styles.controls} ${!activePodcast ? 'opacity-40' : ''}`}
      >
        <Shufle />
        <Previous />
        <Button onClick={() => togglePlay()}>
          {isPlaying ? <Pause /> : <Play />}
        </Button>
        <Next />
        <Repeat />
        <div className={styles.progress}>
          <span>03:41</span>
          <Progress
            value={25}
            size="sm"
            className={`${styles.progressBar} w-[400px]`}
          />
          <span className={styles.time}>12:11</span>
        </div>
      </div>
      <div className={`${styles.volume} ${!activePodcast ? 'opacity-40' : ''}`}>
        <Volume />
        <Progress
          value={25}
          size="sm"
          className={`${styles.progressBar} w-[100px]`}
        />
      </div>
    </div>
  );
};

export default PlayerBar;
