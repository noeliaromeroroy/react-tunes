import { Avatar, Progress, Button, Slider } from '@material-tailwind/react';
import Shufle from '../../assets/svg/shuffle-icon.svg';
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
  const { activePodcast, isPlaying, setIsPlaying, audio } = usePlayerContext();
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [audioProgress, setAudioProgress] = useState(0);
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

  const nextEpisode = () => {};
  const previousEpisode = () => {};

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
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
            </div>
          </>
        )}
      </div>

      <div
        className={`${styles.controls} ${!activePodcast ? 'opacity-40' : ''}`}
      >
        <Shufle />
        <Button onClick={() => previousEpisode()}>
          <Previous />
        </Button>
        <Button onClick={() => togglePlay()}>
          {isPlaying ? <Pause /> : <Play />}
        </Button>
        <Button onClick={() => nextEpisode()}>
          <Next />
        </Button>

        <Repeat />
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
