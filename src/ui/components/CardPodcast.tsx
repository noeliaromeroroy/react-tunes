import React from 'react';

import Play from '../../assets/svg/play-icon.svg';
import Pause from '../../assets/svg/pause-icon.svg';
import { NavLink } from 'react-router-dom';
import { usePlayerContext } from '../contexts/PlayerContext';

import styles from './CardPodcast.module.css';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

import { IPodcast } from '../../domain/models/interfaces/iPodcast.types';

export default function CardPodcast(podcast: IPodcast) {
  const { activePodcast, isPlaying, togglePlay, selectPodcast } =
    usePlayerContext();

  return (
    <Card className={styles.CardPodcast}>
      <CardHeader floated={false}>
        <NavLink
          to={`/detail/${podcast.id}`}
          data-cy={`title-podcast-${podcast.id}`}
        >
          <img src={podcast.coverImageUrl} alt={podcast.title} />
        </NavLink>
      </CardHeader>
      <CardBody className="grow">
        <NavLink
          to={`/detail/${podcast.id}`}
          data-cy={`title-podcast-${podcast.id}`}
        >
          <Typography variant="h4" className={styles.title}>
            {podcast.title}
          </Typography>
        </NavLink>

        <Typography className={styles.author}>{podcast.author}</Typography>
      </CardBody>
      <CardFooter className={styles.buttonContainer}>
        <NavLink
          to={`/detail/${podcast.id}`}
          data-cy={`title-podcast-${podcast.id}`}
        >
          <Button>View detail</Button>
        </NavLink>

        {activePodcast?.id !== podcast.id || activePodcast === undefined ? (
          <Button
            className={styles.action}
            data-cy={`play-${podcast.id}`}
            onClick={() => selectPodcast(podcast.id)}
            id={`play-${podcast.id}`}
          >
            <Play />
          </Button>
        ) : (
          <Button
            data-cy={`play-${podcast.id}`}
            className={styles.action}
            onClick={() => togglePlay()}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
