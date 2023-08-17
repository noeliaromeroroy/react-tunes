import { Avatar, Progress, Button, Slider } from '@material-tailwind/react';
import Shuffle from '../../assets/svg/shuffle-icon.svg';
import Previous from '../../assets/svg/previous-icon.svg';
import Pause from '../../assets/svg/pause-icon.svg';
import Play from '../../assets/svg/play-icon.svg';
import Repeat from '../../assets/svg/repeat-icon.svg';
import Next from '../../assets/svg/next-icon.svg';
import Volume from '../../assets/svg/volume-icon.svg';
import styles from './PlayerBar.module.css';
import { usePlayerContext } from '../contexts/PlayerContext';
import { useEffect, useState, useRef } from 'react';
import { formatTime } from '../helpers/dateHelper';

const PlayerBar: React.FC = () => {
  const {
    activePodcast,
    isPlaying,
    setIsPlaying,
    audio,
    setCurrentAudio,
    activeEpisodeIndex,
    previousEpisode,
    setPreviousEpisode,
    nextEpisode,
    setNextEpisode,
    togglePlay,
    setActiveEpisodeIndex,
  } = usePlayerContext();
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [audioProgress, setAudioProgress] = useState(0);
  const [isRepeatActivated, setIsRepeatActivated] = useState(false);
  const [isShuffleActivated, setIsShuffleActivated] = useState(false);
  const [volume, setVolume] = useState(20);
  const isDragging = useRef(false);

  useEffect(() => {
    if (audio) {
      const updateDuration = () => {
        setDuration(formatTime(audio.duration));
      };

      const handleTimeUpdate = () => {
        if (!isDragging.current) {
          setCurrentTime(formatTime(audio.currentTime));
          setAudioProgress((audio.currentTime * 100) / audio.duration);
        }
      };

      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [audio]);

  const handleSliderChange = (e: any) => {
    const percentage = parseFloat(e.target.value);
    if (audio) {
      const newTime = (percentage / 100) * audio.duration;
      audio.currentTime = newTime;

      setAudioProgress(percentage);
      setCurrentTime(formatTime(newTime));
      if (percentage === 100) setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e: any) => {
    if (audio) {
      audio.volume = e.target.value / 100;
      setVolume(audio.volume * 100);
    }
  };

  const applyRepeatChanges = () => {
    if (isRepeatActivated && activePodcast) {
      setPreviousEpisode(activePodcast.episodes[activeEpisodeIndex].episodeUrl);
      setNextEpisode(activePodcast.episodes[activeEpisodeIndex].episodeUrl);
    }
  };

  const toggleRepeat = () => {
    setIsRepeatActivated((prevValue) => !prevValue);
  };

  const toggleShuffle = () => {
    setIsShuffleActivated((prevValue) => !prevValue);
    if (isShuffleActivated && activePodcast) {
      setNextEpisode(
        activePodcast.episodes[getRandomEpisodeIndex()].episodeUrl,
      );
    }
  };

  const getRandomEpisodeIndex = (): number => {
    let randomIndex = 0;
    if (activePodcast) {
      do {
        randomIndex = Math.floor(Math.random() * activePodcast.episodes.length);
      } while (randomIndex === activeEpisodeIndex);
    } else {
      randomIndex = 0;
    }
    return randomIndex;
  };

  const playPreviousEpisode = () => {
    const index = activeEpisodeIndex;
    if (
      activePodcast &&
      audio &&
      index + 1 <= activePodcast.episodes.length - 1
    ) {
      if (isRepeatActivated) {
        setCurrentAudio(activePodcast.episodes[index].episodeUrl);
      } else {
        setNextEpisode(activePodcast.episodes[index].episodeUrl);
        if (isShuffleActivated) {
          const randomIndex = getRandomEpisodeIndex();
          setCurrentAudio(activePodcast.episodes[randomIndex].episodeUrl);
          setActiveEpisodeIndex(randomIndex);
        } else {
          if (index + 2 > activePodcast.episodes.length - 1) {
            setPreviousEpisode(null);
          } else {
            setPreviousEpisode(activePodcast.episodes[index + 2].episodeUrl);
          }
          setCurrentAudio(activePodcast.episodes[index + 1].episodeUrl);
          setActiveEpisodeIndex(index + 1);
        }
      }
    }
  };

  const playNextEpisode = () => {
    const index = activeEpisodeIndex;
    if (activePodcast && audio && (index - 1 >= 0 || isShuffleActivated)) {
      if (isRepeatActivated) {
        setCurrentAudio(activePodcast.episodes[index].episodeUrl);
      } else {
        setPreviousEpisode(activePodcast.episodes[index].episodeUrl);
        if (isShuffleActivated) {
          const randomIndex = getRandomEpisodeIndex();
          setCurrentAudio(activePodcast.episodes[randomIndex].episodeUrl);
          setActiveEpisodeIndex(randomIndex);
        } else {
          if (index - 2 < 0) {
            setNextEpisode(null);
          } else {
            setNextEpisode(activePodcast.episodes[index - 2].episodeUrl);
          }
          setActiveEpisodeIndex(index - 1);
          setCurrentAudio(activePodcast.episodes[index - 1].episodeUrl);
        }
      }
    }
  };

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
              <div className={styles.podcastTitle}>
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
            disabled={!activePodcast}
            className={`${isShuffleActivated ? '!bg-active/50' : ''}`}
            onClick={() => toggleShuffle()}
          >
            <Shuffle />
          </Button>

          <Button
            onClick={() => playPreviousEpisode()}
            disabled={
              !activePodcast ||
              activeEpisodeIndex === activePodcast.episodes.length - 1
            }
          >
            <Previous />
          </Button>
          <Button
            className="!bg-active"
            onClick={() => togglePlay()}
            disabled={!activePodcast}
          >
            {isPlaying && activePodcast ? <Pause /> : <Play />}
          </Button>
          <Button
            onClick={() => playNextEpisode()}
            disabled={
              !activePodcast ||
              (activeEpisodeIndex === 0 && !isShuffleActivated)
            }
          >
            <Next />
          </Button>

          <Button
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
            min="0"
            max={!activePodcast ? 0 : duration}
            value={!activePodcast ? 0 : audioProgress}
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
