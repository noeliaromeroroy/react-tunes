import { useRef, useEffect, useState } from 'react';

import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';
import { useCache } from '../contexts/CacheContext';
import { getPodcastDetail } from './utils/cacheManager';
import { useErrorHandler } from './useError';
import { CustomError, ErrorTypes } from '../interfaces/iContexts';

export const useAudioManager = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPlayLoading, setIsPlayLoading] = useState<boolean>(false);
  const [activePodcast, setActivePodcast] = useState<IPodcast | null>(null);
  const [activeEpisodeIndex, setActiveEpisodeIndex] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { setCache, getCache } = useCache();
  const { handleError } = useErrorHandler();

  const selectPodcast = async (id: string) => {
    try {
      setIsPlaying(false);
      setIsPlayLoading(true);
      const podcast = await getPodcastDetail(id, setCache, getCache);
      setActivePodcast(podcast);
      setActiveEpisodeIndex(0);
      if (activePodcast?.episodes[1].episodeUrl) {
        audioRef.current = new Audio(podcast?.episodes[1].episodeUrl);
      } else {
        audioRef.current = new Audio(podcast?.episodes[0].episodeUrl);
      }
      audioRef.current
        .play()
        .catch((err) => {
          const playErr: CustomError = {
            type: ErrorTypes.PLAY_ERROR,
            message: `An error occurred while trying to play the podcast. Original error: ${err.message}`
          };
          handleError(playErr);
        })
        .finally(() => setIsPlayLoading(false));
      setIsPlaying(true);
    } catch (error) {
      handleError(error);
    }
  };

  const togglePlay = (podcast?: IPodcast) => {
    if (!activePodcast && podcast) selectPodcast(podcast.id);
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const selectEpisode = async (podcast: IPodcast, episodeUrl: string) => {
    setIsPlayLoading(true);
    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      const index = podcast.episodes.findIndex((episode) => episode.episodeUrl === episodeUrl);

      setActivePodcast(podcast);
      setActiveEpisodeIndex(index);
      audioRef.current = new Audio(episodeUrl);

      audioRef.current
        .play()
        .catch((err) => {
          const playErr: CustomError = {
            type: ErrorTypes.PLAY_ERROR,
            message: `An error occurred while trying to play the podcast. Original error: ${err.message}`
          };
          handleError(playErr);
        })
        .finally(() => setIsPlayLoading(false));
      setIsPlaying(true);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    const play = async () => {
      if (isPlaying) {
        if (audioRef.current) {
          audioRef.current
            .play()
            .catch((err) => {
              handleError(err);
              const playErr: CustomError = {
                type: ErrorTypes.PLAY_ERROR,
                message: `An error occurred while trying to play the podcast. Original error: ${err.message}`
              };
              handleError(playErr);
            })
            .finally(() => setIsPlayLoading(false));
        }
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
    };
    play();
  }, [isPlaying]);

  return {
    isPlaying,
    setIsPlaying,
    isPlayLoading,
    setIsPlayLoading,
    activePodcast,
    setActivePodcast,
    setActiveEpisodeIndex,
    activeEpisodeIndex,
    audioRef,
    togglePlay,
    selectPodcast,
    selectEpisode
  };
};
