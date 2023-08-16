import { IEpisode } from '../../domain/models/interfaces/iEpisode.types';
import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';

export const searchPodcasts = async (term: string): Promise<IPodcast[]> => {
  const url = new URL('https://itunes.apple.com/search');
  const params = {
    country: 'ES',
    lang: 'es_es',
    limit: 200,
    term,
    media: 'podcast',
  };

  try {
    url.search = new URLSearchParams(params as any).toString();
    const response = await fetch(url.toString());
    const data = await response.json();

    return data.results.map((result: any) => ({
      id: result.collectionId.toString(),
      title: result.collectionName,
      description: result.collectionCensoredName,
      author: result.artistName,
      releaseDate: result.releaseDate,
      coverImageUrl: result.artworkUrl100,
      feedUrl: result.feedUrl,
      episodes: [],
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPodcastDetail = async (id: string): Promise<IPodcast> => {
  try {
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=100`,
    );

    if (!response.ok) {
      throw new Error(`Error connecting with iTunes: ${response.status}`);
    }

    const data = await response.json();

    const podcastDetail: IPodcast = {
      id: id,
      title: data.results[0].collectionName,
      description: '',
      author: data.results[0].artistName,
      episodes: [],
      coverImageUrl: data.results[0].artworkUrl600,
      releaseDate: data.results[0].releaseDate,
      feedUrl: data.results[0].feedUrl,
    };

    data.results.shift();

    podcastDetail.episodes = data.results.map((result: any) => ({
      id: result.trackId,
      title: result.trackName,
      topic: result.shortDescription,
      duration: result.trackTimeMillis,
      releaseDate: result.releaseDate,
    }));

    return podcastDetail;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
