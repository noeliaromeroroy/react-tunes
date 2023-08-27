import { IEpisode } from './iEpisode.types';

export interface IPodcast {
  id: string;
  title: string;
  description: string;
  author: string;
  episodes: IEpisode[];
  coverImageUrl: string;
  releaseDate: string;
  feedUrl: string;
}
