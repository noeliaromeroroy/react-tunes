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
      episodes: [],
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
};
