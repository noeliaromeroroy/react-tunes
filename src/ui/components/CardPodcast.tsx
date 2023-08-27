import React from 'react';

import { NavLink } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';
import Play from '../../assets/svg/play-icon.svg';
import Pause from '../../assets/svg/pause-icon.svg';
import { usePlayerContext } from '../contexts/PlayerContext';

import styles from './CardPodcast.module.css';

interface CardPodcastProps {
  id: string;
  coverImageUrl: string;
  title: string;
  author: string;
}

export default function CardPodcast({ id, coverImageUrl, title, author }: CardPodcastProps) {
  const { activePodcast, isPlaying, togglePlay, selectPodcast, isPlayLoading } = usePlayerContext();

  return (
    <Card className={styles.CardPodcast}>
      <CardHeader floated={false}>
        <NavLink to={`/detail/${id}`} data-cy={`title-feat-podcast-${id}`}>
          <img src={coverImageUrl} alt={title} />
        </NavLink>
      </CardHeader>
      <CardBody className="grow">
        <NavLink to={`/detail/${id}`} data-cy={`title-feat-podcast-${id}`}>
          <Typography variant="h4" className={styles.title}>
            {title}
          </Typography>
        </NavLink>

        <Typography className={styles.author}>{author}</Typography>
      </CardBody>
      <CardFooter className={styles.buttonContainer}>
        <NavLink to={`/detail/${id}`} data-cy={`title-feat-podcast-${id}`}>
          <Button>View detail</Button>
        </NavLink>

        {activePodcast?.id !== id || activePodcast === undefined ? (
          <Button
            className={styles.action}
            data-cy={`play-${id}`}
            onClick={() => selectPodcast(id)}
            id={`play-${id}`}
            disabled={isPlayLoading}
          >
            <Play />
          </Button>
        ) : (
          <Button
            data-cy={`play-${id}`}
            className={styles.action}
            onClick={() => togglePlay()}
            disabled={isPlayLoading}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
