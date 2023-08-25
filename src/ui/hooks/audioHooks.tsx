import { useRef, useEffect, useState } from 'react';

import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';
import { getPodcastDetail } from '../../infrastructure/services/ITunesPodcastService';

export const useAudioManager = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPlayLoading, setIsPlayLoading] = useState<boolean>(false);
  const [activePodcast, setActivePodcast] = useState<IPodcast | null>(null);
  const [activeEpisodeIndex, setActiveEpisodeIndex] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (podcast?: IPodcast) => {
    if (!activePodcast && podcast) selectPodcast(podcast.id);
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const selectPodcast = async (id: string) => {
    try {
      setIsPlaying(false);
      setIsPlayLoading(true);
      const podcast = await getPodcastDetail(id);
      setActivePodcast(podcast);
      setActiveEpisodeIndex(0);
      if (activePodcast?.episodes[1].episodeUrl) {
        audioRef.current = new Audio(podcast?.episodes[1].episodeUrl);
      } else {
        audioRef.current = new Audio(podcast?.episodes[0].episodeUrl);
      }
      audioRef.current.play().finally(() => setIsPlayLoading(false));
      setIsPlaying(true);
    } catch (error) {
      console.log('AQUI');
    }
  };

  const selectEpisode = async (podcast: IPodcast, episodeUrl: string) => {
    setIsPlayLoading(true);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const index = podcast.episodes.findIndex(
      (episode) => episode.episodeUrl === episodeUrl,
    );

    setActivePodcast(podcast);
    setActiveEpisodeIndex(index);
    audioRef.current = new Audio(episodeUrl);

    audioRef.current.play().finally(() => setIsPlayLoading(false));
    setIsPlaying(true);
  };

  useEffect(() => {
    const play = async () => {
      if (isPlaying) {
        if (audioRef.current) {
          audioRef.current.play().finally(() => setIsPlayLoading(false));
        }
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
        }
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
    selectEpisode,
  };
};
