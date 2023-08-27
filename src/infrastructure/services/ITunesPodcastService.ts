import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';

export const searchPodcasts = async (term: string | null, limit?: number, page?: number): Promise<IPodcast[]> => {
  const url = new URL('https://itunes.apple.com/search');

  let offset = 0;
  if (limit && page) {
    offset = limit * page;
  }

  const params = {
    limit: limit || 10,
    offset,
    term,
    media: 'podcast'
  };

  url.search = new URLSearchParams(params as any).toString();
  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`iTunes Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return data.results.map((result: any) => ({
    id: result.collectionId.toString(),
    title: result.collectionName,
    description: result.collectionCensoredName,
    author: result.artistName,
    releaseDate: result.releaseDate,
    coverImageUrl: result.artworkUrl100,
    feedUrl: result.feedUrl,
    episodes: []
  }));
};

export const fetchDetail = async (id: string): Promise<IPodcast> => {
  const response = await fetch(
    `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=100`
  );

  if (!response.ok) {
    throw new Error(`iTunes Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (data.resultCount === 0) {
    throw new Error('Podcast not found');
  }

  const podcastDetail: IPodcast = {
    id,
    title: data.results[0].collectionName,
    description: data.results[0].collectionCensoredName,
    author: data.results[0].artistName,
    episodes: [],
    coverImageUrl: data.results[0].artworkUrl600,
    releaseDate: data.results[0].releaseDate,
    feedUrl: data.results[0].feedUrl
  };

  data.results.shift();

  podcastDetail.episodes = data.results.map((result: any) => ({
    id: result.trackId.toString(),
    title: result.trackName,
    topic: result.description,
    duration: result.trackTimeMillis,
    cover: result.artworkUrl600,
    releaseDate: result.releaseDate,
    episodeUrl: result.episodeUrl
  }));

  return podcastDetail;
};

export const getFeaturedPodcast = async (country_code?: string): Promise<IPodcast[]> => {
  const url = new URL('https://itunes.apple.com/search');
  const params = {
    ...(country_code ? { country: country_code } : {}),
    limit: 21,
    media: 'podcast',
    term: 'podcast'
  };

  url.search = new URLSearchParams(params as any).toString();
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`iTunes Error: ${response.statusText}`);
  }

  const data = await response.json();

  return data.results.map((result: any) => ({
    id: result.collectionId.toString(),
    title: result.collectionName,
    description: result.collectionCensoredName,
    author: result.artistName,
    releaseDate: result.releaseDate,
    coverImageUrl: result.artworkUrl100,
    feedUrl: result.feedUrl,
    episodes: []
  }));
};
