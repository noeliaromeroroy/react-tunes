import { useEffect, useState } from 'react';

import { usePlayerContext } from '../../contexts/PlayerContext';
import { SubSearchBar } from '../../components/SubSearchBar';
import { HomeTable } from '../../components/HomeTable';
import { IPodcast } from '../../../domain/models/interfaces/iPodcast.types';
import '../../../assets/styles/index.css';
import { getFeaturedPodcast } from '../../../infrastructure/services/ITunesPodcastService';
import { getUserCountry } from '../../../infrastructure/services/NominatimService';
import { Spinner } from '@material-tailwind/react';
import CardPodcast from '../../components/CardPodcast';

import styles from './HomePage.module.css';

function Search(): JSX.Element {
  const {
    results,
    setIsHome,
    filteredResults,
    setFilteredResults,
    featuredPodcast,
    setFeaturedPodcast,
    country,
    setCountry,
  } = usePlayerContext();

  const [orderBy, setOrderBy] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
          console.log(country);
        }

        setFeaturedPodcast(podcastsByLocation);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar los podcasts:', error);
      }
    };
    featuredPodcast.length === 0 ? loadPodcasts() : setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isActiveSearch) setFilterValue('');
    let filteredResults = results.filter(
      (podcast) =>
        podcast.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        podcast.description.toLowerCase().includes(filterValue.toLowerCase()) ||
        podcast.author.toLowerCase().includes(filterValue.toLowerCase()),
    );
    let sortedData = [...filteredResults];
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
  }, [orderBy, filterValue, isActiveSearch]);

  return (
    <div id="HomePage">
      {filteredResults.length > 0 ? (
        <>
          <SubSearchBar
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            setFilterValue={setFilterValue}
            isActiveSearch={isActiveSearch}
            setIsActiveSearch={setIsActiveSearch}
            options={[
              { value: 'title', label: 'Title' },
              { value: 'author', label: 'Author' },
              { value: 'date', label: 'Date' },
            ]}
          />
          <HomeTable podcasts={filteredResults} />
        </>
      ) : (
        <>
          {isLoading ? (
            <div className={styles.loader}>
              <Spinner className={styles.spinner} color="indigo" />
            </div>
          ) : (
            <div>
              <h1>The latest podcasts on {country}</h1>
              <div className={styles.featuredPodcast}>
                {featuredPodcast &&
                  featuredPodcast.map((podcast: IPodcast) => {
                    return <CardPodcast {...podcast} key={podcast.id} />;
                  })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Search;
