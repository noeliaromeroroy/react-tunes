import React from 'react';
import { Spinner } from '@material-tailwind/react';

import { usePlayerContext } from '../../contexts/PlayerContext';
import { IPodcast } from '../../../domain/models/interfaces/iPodcast.types';
import '../../../assets/styles/index.css';
import CardPodcast from '../../components/CardPodcast';
import { useFeaturedPodcasts } from '../../hooks/usePodcast';

import styles from './HomePage.module.css';

function Home(): JSX.Element {
  const { featuredPodcast, country } = usePlayerContext();

  const { isLoading } = useFeaturedPodcasts();

  return (
    <div id="HomePage">
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
                return (
                  <CardPodcast
                    author={podcast.author}
                    id={podcast.id}
                    title={podcast.title}
                    coverImageUrl={podcast.coverImageUrl}
                    key={podcast.id}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
