import { IEpisode } from './interfaces/iEpisode.types';
import { IPodcast } from './interfaces/iPodcast.types';

export function addEpisode(podcast: IPodcast, episode: IEpisode): IPodcast {
  return {
    ...podcast,
    episodes: [...podcast.episodes, episode],
  };
}

export function removeEpisode(podcast: IPodcast, episodeId: string): IPodcast {
  return {
    ...podcast,
    episodes: podcast.episodes.filter((e) => e.id !== episodeId),
  };
}
