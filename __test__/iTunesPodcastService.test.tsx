import { searchPodcasts, fetchDetail } from '../src/infrastructure/services/ITunesPodcastService';

import { mockedSearchPodcastsResponse, mockedGetPodcastDetailResponse } from '../__mocks__';

describe('searchPodcasts', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return IPodcast[] if iTunes returns some results', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockedSearchPodcastsResponse)
    });

    global.fetch = mockFetch;

    const result = await searchPodcasts('test');

    expect(mockFetch).toHaveBeenCalledWith('https://itunes.apple.com/search?limit=10&offset=0&term=test&media=podcast');

    expect(result).toEqual([
      {
        id: '205892240',
        title: 'Test Match Special',
        description: 'Test Match Special',
        author: 'BBC Radio 5 Live',
        releaseDate: '2023-08-05T07:48:00Z',
        coverImageUrl:
          'https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/1b/7f/71/1b7f71fb-663c-73d2-d7aa-802a3897e305/mza_15833932256799444157.jpg/100x100bb.jpg',
        episodes: [],
        feedUrl: 'https://podcasts.files.bbci.co.uk/p02nrsl2.rss'
      },
      {
        id: '1211148486',
        title: 'Test Your English',
        description: 'Test Your English',
        author: 'vaughanradio',
        releaseDate: '2023-07-20T11:29:00Z',
        coverImageUrl:
          'https://is2-ssl.mzstatic.com/image/thumb/Podcasts125/v4/88/bb/39/88bb3976-a296-f4f7-94a3-d7246d79ef54/mza_10496370084980525431.jpg/100x100bb.jpg',
        episodes: [],
        feedUrl: 'https://www.ivoox.com/test-your-english_fg_f1309388_filtro_1.xml'
      }
    ]);
  });

  it('should return an empty array if iTunes does not returns any result', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        resultCount: 0,
        results: []
      })
    });

    global.fetch = mockFetch;

    const result = await searchPodcasts('ThisTextDontReturnAnyPodcast');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://itunes.apple.com/search?limit=10&offset=0&term=ThisTextDontReturnAnyPodcast&media=podcast'
    );

    expect(result).toEqual([]);
  });

  it('should throw an error when there is a network failure', async () => {
    const mockFetch = jest.fn().mockRejectedValue(new Error('Network failure'));

    global.fetch = mockFetch;

    await expect(searchPodcasts('networkFailure')).rejects.toThrow('Network failure');
  });

  it('should throw an iTunes error when response is not ok', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({})
    });

    global.fetch = mockFetch;

    await expect(searchPodcasts('iTunes returns error')).rejects.toThrow(/iTunes Error:/);
  });
});

describe('fetchDetail', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return an IPodcast model with some Episodes', async () => {
    // Mock
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockedGetPodcastDetailResponse)
    });

    global.fetch = mockFetch;

    const result = await fetchDetail('160904630');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://itunes.apple.com/lookup?id=160904630&media=podcast&entity=podcastEpisode&limit=100'
    );

    expect(result).toEqual(
      expect.objectContaining({
        id: '160904630',
        title: 'TED Talks Daily',
        description: 'TED Talks Daily',
        author: 'TED',
        releaseDate: '2023-08-15T14:49:00Z',
        coverImageUrl:
          'https://is4-ssl.mzstatic.com/image/thumb/Podcasts115/v4/d2/09/d5/d209d58f-8f9f-c2aa-3c59-0ffc4e5e35ec/mza_11998461689189714171.png/600x600bb.jpg',
        feedUrl: 'http://feeds.feedburner.com/TEDTalks_audio'
      })
    );

    expect(result?.episodes.length).toBeGreaterThan(1);
  });

  it('should throw an Error if iTunes does not returns any result', async () => {
    // Mock
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        resultCount: 0,
        results: []
      })
    });

    global.fetch = mockFetch;

    await expect(fetchDetail('123456789123456789')).rejects.toThrow('Podcast not found');
  });

  it('should throw an error when there is a network failure', async () => {
    const mockFetch = jest.fn().mockRejectedValue(new Error('Network failure'));

    global.fetch = mockFetch;

    await expect(fetchDetail('160904630')).rejects.toThrow('Network failure');
  });

  it('should throw an iTunes error when response is not ok', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({})
    });

    global.fetch = mockFetch;

    await expect(searchPodcasts('iTunes returns error')).rejects.toThrow(/iTunes Error:/);
  });
});
