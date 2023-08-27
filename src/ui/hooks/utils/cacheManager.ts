/* eslint-disable no-console */
import { IPodcast } from '../../../domain/models/interfaces/iPodcast.types';
import { fetchDetail } from '../../../infrastructure/services/ITunesPodcastService';

export const getPodcastDetail = async (id: string, setCache: Function, getCache: Function): Promise<IPodcast> => {
  try {
    const cachedPodcast = getCache(id);
    if (cachedPodcast) {
      console.log('Returning cache version podcast');
      return cachedPodcast;
    }
    console.log('No cache version podcast');

    const podcast = await fetchDetail(id);
    setCache(id, podcast);

    return podcast;
  } catch (error) {
    console.error(error);

    throw error;
  }
};
