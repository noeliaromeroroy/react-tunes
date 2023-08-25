import { useState, useEffect } from 'react';
import { getFeaturedPodcast } from '../../infrastructure/services/ITunesPodcastService';
import { getUserCountry } from '../../infrastructure/services/NominatimService';
import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';
import { usePlayerContext } from '../contexts/PlayerContext';
import { searchPodcasts } from '../../infrastructure/services/ITunesPodcastService';
import { getPodcastDetail } from '../../infrastructure/services/ITunesPodcastService';

export const useFeaturedPodcasts = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    setIsHome,
    featuredPodcast,
    setFeaturedPodcast,
    country,
    setCountry,
  } = usePlayerContext();

  const getUserLocation = (): Promise<{ lat: string; lng: string } | null> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const coords = {
            lat: String(position.coords.latitude),
            lng: String(position.coords.longitude),
          };
          resolve(coords);
        },
        function (error) {
          if (error.PERMISSION_DENIED) {
            resolve(null);
          } else {
            reject(error);
          }
        },
      );
    });
  };

  useEffect(() => {
    setIsHome(true);
    const loadPodcasts = async () => {
      try {
        const coords = await getUserLocation();
        let podcastsByLocation: IPodcast[] = [];

        if (coords) {
          const location = await getUserCountry(coords);
          if (location) {
            podcastsByLocation = await getFeaturedPodcast(
              location.country_code,
            );
            setCountry(location.country);
          }
        } else {
          podcastsByLocation = await getFeaturedPodcast();
        }

        setFeaturedPodcast(podcastsByLocation);
      } catch (error) {
        console.error('Error al establecer los podcast destacados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (featuredPodcast.length === 0) {
      loadPodcasts();
    } else {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, featuredPodcast, country };
};

export const useFilteredAndSortedPodcasts = (
  results: IPodcast[],
  orderBy: string,
  filterValue: string,
  isActiveSearch: boolean,
  setFilteredResults: (results: IPodcast[]) => void,
) => {
  useEffect(() => {
    try {
      if (!isActiveSearch) filterValue = '';
      let filtered = results.filter(
        (podcast) =>
          podcast.title.toLowerCase().includes(filterValue.toLowerCase()) ||
          podcast.description
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          podcast.author.toLowerCase().includes(filterValue.toLowerCase()),
      );
      let sortedData = [...filtered];
      switch (orderBy) {
        case 'title':
          sortedData.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'author':
          sortedData.sort((a, b) => a.author.localeCompare(b.author));
          break;
        case 'date':
          sortedData.sort(
            (a, b) =>
              new Date(b.releaseDate).getTime() -
              new Date(a.releaseDate).getTime(),
          );
          break;
        default:
          break;
      }
      setFilteredResults(sortedData);
    } catch (error) {
      console.error('Error al filtrar y ordenar los resultados:', error);
    }
  }, [orderBy, filterValue, isActiveSearch, results, setFilteredResults]);
};

export const usePodcastSearch = () => {
  const { setResults, setFilteredResults } = usePlayerContext();

  const search = async (term: string) => {
    const podcasts = await searchPodcasts(term);
    setResults(podcasts);
    setFilteredResults(podcasts);
  };

  return { search };
};

export const usePodcastDetails = (id: string | undefined): IPodcast | null => {
  const [detailedPodcast, setDetailedPodcast] = useState<IPodcast | null>(null);

  useEffect(() => {
    const getEpisodes = async (podcastId: string) => {
      const podcast = await getPodcastDetail(podcastId);
      setDetailedPodcast(podcast);
    };

    if (id) {
      getEpisodes(id);
    }
  }, [id]);

  return detailedPodcast;
};
