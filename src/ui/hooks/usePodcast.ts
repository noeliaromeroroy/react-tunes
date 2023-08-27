import { useState, useEffect } from 'react';
import { getFeaturedPodcast } from '../../infrastructure/services/ITunesPodcastService';
import { getUserCountry } from '../../infrastructure/services/NominatimService';
import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';
import { usePlayerContext } from '../contexts/PlayerContext';
import { useCache } from '../contexts/CacheContext';
import { getPodcastDetail } from './utils/cacheManager';
import { CustomError, ErrorTypes } from '../interfaces/iContexts';
import { useErrorHandler } from './useError';

export const useFeaturedPodcasts = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { setIsHome, featuredPodcast, setFeaturedPodcast, country, setCountry } = usePlayerContext();

  const { handleError } = useErrorHandler();

  const getUserLocation = (): Promise<{ lat: string; lng: string } | null> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        function getCoords(position) {
          const coords = {
            lat: String(position.coords.latitude),
            lng: String(position.coords.longitude)
          };
          resolve(coords);
        },
        function getError(error) {
          if (error.PERMISSION_DENIED) {
            resolve(null);
          } else {
            reject(error);
          }
        }
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
            podcastsByLocation = await getFeaturedPodcast(location.country_code);
            setCountry(location.country);
          }
        } else {
          podcastsByLocation = await getFeaturedPodcast();
        }

        setFeaturedPodcast(podcastsByLocation);
      } catch (err: any) {
        const playErr: CustomError = {
          type: ErrorTypes.GET_PODCAST,
          message: `An error occurred while trying to get the featured podcast list. Original error: ${err.message}`
        };
        handleError(playErr);
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
  setFilteredResults: (results: IPodcast[]) => void
) => {
  const { handleError } = useErrorHandler();
  useEffect(() => {
    try {
      let filter = filterValue;
      if (!isActiveSearch) filter = '';
      const filtered = results.filter(
        (podcast) =>
          podcast.title.toLowerCase().includes(filter.toLowerCase()) ||
          podcast.description.toLowerCase().includes(filter.toLowerCase()) ||
          podcast.author.toLowerCase().includes(filter.toLowerCase())
      );
      const sortedData = [...filtered];
      switch (orderBy) {
        case 'title':
          sortedData.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'author':
          sortedData.sort((a, b) => a.author.localeCompare(b.author));
          break;
        case 'date':
          sortedData.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
          break;
        default:
          break;
      }
      setFilteredResults(sortedData);
    } catch (err: any) {
      const playErr: CustomError = {
        type: ErrorTypes.FILTER_PODCAST,
        message: `An error occurred while trying to get the filter podcast list. Original error: ${err.message}`
      };
      handleError(playErr);
    }
  }, [orderBy, filterValue, isActiveSearch, results, setFilteredResults]);
};

export const usePodcastDetails = (id: string | undefined): IPodcast | null => {
  const [detailedPodcast, setDetailedPodcast] = useState<IPodcast | null>(null);

  const { setCache, getCache } = useCache();

  useEffect(() => {
    const getEpisodes = async (podcastId: string) => {
      const podcast = await getPodcastDetail(podcastId, setCache, getCache);
      setDetailedPodcast(podcast);
    };

    if (id) {
      getEpisodes(id);
    }
  }, [id]);

  return detailedPodcast;
};
