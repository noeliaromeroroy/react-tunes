import { ITunesPodcastRepository } from '../../domain/models/interfaces/iItunesPodcastRepository.types';
import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';

class ITunesPodcastService implements ITunesPodcastRepository {
  async searchPodcasts(term: string): Promise<IPodcast[]> {
    const url = new URL('https://itunes.apple.com/search');
    const params = {
      country: 'ES',
      lang: 'es_es',
      limit: '50',
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
        coverImageUrl: result.artworkUrl100,
        episodes: [],
      }));
    } catch (error) {
      console.error(error);
      throw error; // Es una buena práctica propagar el error para manejarlo en niveles superiores.
    }
  }
}

export { ITunesPodcastService };
