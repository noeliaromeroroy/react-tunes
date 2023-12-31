import { useState } from 'react';
import { searchPodcasts } from '../../infrastructure/services/ITunesPodcastService';
import { usePlayerContext } from '../contexts/PlayerContext';
import { useErrorHandler } from './useError';
import { CustomError, ErrorTypes } from '../interfaces/iContexts';

export const useSearchLogic = (term: string | undefined) => {
  const { setResults, setFilteredResults } = usePlayerContext();
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);

  const { handleError } = useErrorHandler();

  const loadMore = async () => {
    try {
      const podcasts = await searchPodcasts(term, 10, page);
      setFilteredResults((prevItems) => [...prevItems, ...podcasts]);
      setResults((prevItems) => [...prevItems, ...podcasts]);
      setPage((prevPage) => prevPage + 1);
    } catch (err: any) {
      const playErr: CustomError = {
        type: ErrorTypes.SEARCH_PODCAST,
        message: `An error occurred while trying to search podcast. Original error: ${err.message}`
      };
      handleError(playErr);
    }
  };
  const search = async () => {
    const callSearch = async () => {
      const podcasts = await searchPodcasts(term, 10, 0);
      setFilteredResults(podcasts);
      setResults(podcasts);
    };
    try {
      callSearch().finally(() => setIsLoading(false));
    } catch (err: any) {
      const playErr: CustomError = {
        type: ErrorTypes.SEARCH_PODCAST,
        message: `An error occurred while trying to search podcast. Original error: ${err.message}`
      };
      handleError(playErr);
    }
  };

  return { isLoading, loadMore, search };
};
