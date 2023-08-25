import { useEffect, useState } from 'react';
import { IEpisode } from '../../domain/models/interfaces/iEpisode.types';

export const useFilteredAndSortedEpisodes = (
  episodes: IEpisode[] | undefined,
  orderBy: string,
  filterValue: string,
  isActiveSearch: boolean,
) => {
  const [filteredEpisodes, setFilteredEpisodes] = useState<
    IEpisode[] | undefined
  >([]);

  useEffect(() => {
    if (!isActiveSearch) filterValue = '';
    if (episodes) {
      let filteredResults = episodes.filter(
        (episode) =>
          episode.title.toLowerCase().includes(filterValue.toLowerCase()) ||
          episode.topic.toLowerCase().includes(filterValue.toLowerCase()),
      );
      let sortedData = [...filteredResults];

      switch (orderBy) {
        case 'title':
          sortedData.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'date':
          sortedData.sort(
            (a, b) =>
              new Date(b.releaseDate).getTime() -
              new Date(a.releaseDate).getTime(),
          );
          break;
        case 'duration':
          sortedData.sort((a, b) => a.duration - b.duration);
          break;
        default:
          break;
      }
      setFilteredEpisodes(sortedData);
    }
  }, [episodes, orderBy, filterValue, isActiveSearch]);

  return filteredEpisodes;
};
