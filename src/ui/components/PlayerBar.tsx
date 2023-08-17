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

  useEffect(() => {
    if (activePodcast) {
      activeEpisodeIndex === 0
        ? setPreviousEpisode(null)
        : setPreviousEpisode(
            activePodcast.episodes[activeEpisodeIndex + 1].episodeUrl,
          );

      activeEpisodeIndex !== activePodcast?.episodes.length - 1
        ? setNextEpisode(
            activePodcast.episodes[activeEpisodeIndex - 1].episodeUrl,
          )
        : setNextEpisode(null);

      //Repeat
      if (isRepeatActivated) {
        applyRepeatChanges;
      }
    }
  }, [activeEpisodeIndex]);

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
  };

  const playPreviousEpisode = () => {
    if (activePodcast && audio) {
      const index = activeEpisodeIndex;
      if (isRepeatActivated) {
        setCurrentAudio(activePodcast.episodes[index].episodeUrl);
      } else {
        setNextEpisode(activePodcast.episodes[index].episodeUrl);
        setPreviousEpisode(activePodcast.episodes[index + 2].episodeUrl);
        setCurrentAudio(activePodcast.episodes[index + 1].episodeUrl);
        setActiveEpisodeIndex(index + 1);
      }
    }
  };

  const playNextEpisode = () => {
    const index = activeEpisodeIndex;
    if (activePodcast && audio && index - 1 >= 0) {
      if (isRepeatActivated) {
        setCurrentAudio(activePodcast.episodes[index].episodeUrl);
      } else {
        if (index - 2 < 0) {
          setNextEpisode(null);
        } else {
          setNextEpisode(activePodcast.episodes[index - 2].episodeUrl);
        }
        setPreviousEpisode(activePodcast.episodes[index].episodeUrl);
        setCurrentAudio(activePodcast.episodes[index - 1].episodeUrl);
        setActiveEpisodeIndex(index - 1);
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
              <div className={styles.podcastTitl}>{activePodcast.title}</div>
              <div className={styles.podcastAuthor}>{activePodcast.author}</div>

              {/*  */}
              <div className={styles.podcastAuthor}>
                {activePodcast.episodes[activeEpisodeIndex].title}
              </div>
              {/*  */}
            </div>
          </>
        )}
      </div>

      <div
        className={`${styles.controls} ${!activePodcast ? 'opacity-40' : ''}`}
      >
        <Button
          className={`${isShuffleActivated ? 'bg-indigo-400' : ''}`}
          onClick={() => toggleShuffle()}
        >
          <Shuffle />
        </Button>

        <Button onClick={() => playPreviousEpisode()}>
          <Previous />
        </Button>
        <Button onClick={() => togglePlay()}>
          {isPlaying ? <Pause /> : <Play />}
        </Button>
        <Button onClick={() => playNextEpisode()}>
          <Next />
        </Button>

        <Button
          className={`${isRepeatActivated ? 'bg-indigo-400' : ''}`}
          onClick={() => toggleRepeat()}
        >
          <Repeat />
        </Button>

        <div className={styles.progress}>
          <span>{currentTime}</span>
          <Slider
            min="0"
            max={duration}
            value={audioProgress}
            onChange={handleSliderChange}
            className={`${styles.progressBar} w-[400px]`}
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
          className={`${styles.progressBar} w-[100px]`}
        />
      </div>
    </div>
  );
};

export default PlayerBar;
