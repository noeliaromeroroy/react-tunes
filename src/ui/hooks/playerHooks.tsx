import { useState, useEffect, useRef } from 'react';
import { usePlayerContext } from '../contexts/PlayerContext';
import { formatTime } from '../helpers/dateHelper';

export const usePlayerControls = () => {
  const {
    activePodcast,
    setIsPlaying,
    audio,
    setCurrentAudio,
    activeEpisodeIndex,
    setPreviousEpisode,
    setNextEpisode,
    setActiveEpisodeIndex,
  } = usePlayerContext();

  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [audioProgress, setAudioProgress] = useState(0);
  const [isRepeatActivated, setIsRepeatActivated] = useState(false);
  const [isShuffleActivated, setIsShuffleActivated] = useState(false);
  const [volume, setVolume] = useState(20);
  const isDragging = useRef(false);

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
    if (
      activePodcast &&
      audio &&
      (index - 1 >= 0 || isShuffleActivated || isRepeatActivated)
    ) {
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

  useEffect(() => {
    if (audio) {
      const updateDuration = () => {
        if (audio.duration) setDuration(formatTime(audio.duration));
      };

      const handleTimeUpdate = () => {
        if (!isDragging.current) {
          setCurrentTime(formatTime(audio.currentTime));
          if (audio.currentTime > 0) {
            setAudioProgress((audio.currentTime * 100) / audio.duration);
          }
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

  return {
    currentTime,
    duration,
    audioProgress,
    isRepeatActivated,
    setIsRepeatActivated,
    isShuffleActivated,
    setCurrentAudio,
    setIsShuffleActivated,
    volume,
    setVolume,
    handleSliderChange,
    handleVolumeChange,
    toggleRepeat,
    toggleShuffle,
    playPreviousEpisode,
    playNextEpisode,
  };
};
