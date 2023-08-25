import { Avatar, Button, Slider } from '@material-tailwind/react';

import { usePlayerContext } from '../contexts/PlayerContext';
import { usePlayerControls } from '../hooks/playerHooks';
import styles from './PlayerBar.module.css';
import Shuffle from '../../assets/svg/shuffle-icon.svg';
import Previous from '../../assets/svg/previous-icon.svg';
import Pause from '../../assets/svg/pause-icon.svg';
import Play from '../../assets/svg/play-icon.svg';
import Repeat from '../../assets/svg/repeat-icon.svg';
import Next from '../../assets/svg/next-icon.svg';
import Volume from '../../assets/svg/volume-icon.svg';

const PlayerBar: React.FC = () => {
  const {
    activePodcast,
    isPlaying,
    activeEpisodeIndex,
    togglePlay,
    isPlayLoading,
  } = usePlayerContext();

  const {
    currentTime,
    duration,
    audioProgress,
    isRepeatActivated,
    isShuffleActivated,
    volume,
    handleSliderChange,
    handleVolumeChange,
    toggleRepeat,
    toggleShuffle,
    playPreviousEpisode,
    playNextEpisode,
  } = usePlayerControls();

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
              <div
                className={styles.podcastTitle}
                data-cy="title-active-podcast"
              >
                {activePodcast.episodes[activeEpisodeIndex].title.slice(0, 35)}{' '}
                {activePodcast.episodes[activeEpisodeIndex].title.length > 35 &&
                  '...'}
              </div>
              <div className={styles.podcastAuthor}>{activePodcast.author}</div>
            </div>
          </>
        )}
      </div>

      <div
        className={`${styles.controlsBar} ${
          !activePodcast ? 'opacity-40' : ''
        }`}
      >
        <div className={styles.controls}>
          <Button
            data-cy="btn-shuffle"
            disabled={!activePodcast}
            className={`${isShuffleActivated ? '!bg-active/50' : ''}`}
            onClick={() => toggleShuffle()}
          >
            <Shuffle />
          </Button>

          <Button
            data-cy="btn-prev"
            onClick={() => playPreviousEpisode()}
            disabled={
              !activePodcast ||
              activeEpisodeIndex === activePodcast.episodes.length - 1
            }
          >
            <Previous />
          </Button>
          <Button
            data-cy="btn-play"
            className="!bg-active"
            onClick={() => togglePlay()}
            disabled={!activePodcast || isPlayLoading}
          >
            {isPlaying && activePodcast ? (
              <Pause data-cy="pause-icon" />
            ) : (
              <Play data-cy="play-icon" />
            )}
          </Button>
          <Button
            data-cy="btn-next"
            onClick={() => playNextEpisode()}
            disabled={
              !activePodcast ||
              (activeEpisodeIndex === 0 &&
                !isShuffleActivated &&
                !isRepeatActivated)
            }
          >
            <Next />
          </Button>

          <Button
            data-cy="btn-repeat"
            className={`${isRepeatActivated ? '!bg-active/50' : ''}`}
            onClick={() => toggleRepeat()}
            disabled={!activePodcast}
          >
            <Repeat />
          </Button>
        </div>
        <div className={styles.progress}>
          <span>{currentTime}</span>
          <Slider
            min={0}
            max={duration}
            value={audioProgress}
            defaultValue={0}
            onChange={handleSliderChange}
            className={`${styles.progressBar} w-full`}
          />
          <span className={styles.time}>{duration}</span>
        </div>
      </div>
      <div className={`${styles.volume} ${!activePodcast ? 'opacity-40' : ''}`}>
        <Volume />
        <Slider
          value={volume}
          size="sm"
          onChange={handleVolumeChange}
          className={`${styles.progressBar} w-full max-w-full`}
        />
      </div>
    </div>
  );
};

export default PlayerBar;
