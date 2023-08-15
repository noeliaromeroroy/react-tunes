import { Avatar, Progress } from '@material-tailwind/react';
import Shufle from '../../assets/svg/shuffle-icon.svg';
import Previous from '../../assets/svg/previous-icon.svg';
import Pause from '../../assets/svg/pause-icon.svg';
import Repeat from '../../assets/svg/repeat-icon.svg';
import Next from '../../assets/svg/next-icon.svg';
import Volume from '../../assets/svg/volume-icon.svg';
import styles from './PlayerBar.module.css';

const PlayerBar: React.FC = () => (
  <div className={styles.PlayerBar}>
    <div className={styles.podcastDetail}>
      <Avatar size="xxl" variant="square" src="/images/podcast-01.jpg" />
      <div className="flex flex-col justify-center">
        <div className={styles.podcastTitl}>
          How to make your partner talk more
        </div>
        <div className={styles.podcastAuthor}>Ken Adams</div>
      </div>
    </div>
    <div className={styles.controls}>
      <Shufle />
      <Previous />
      <Pause />
      <Next />
      <Repeat />
      <div className={styles.progress}>
        <span>03:41</span>
        <Progress
          value={25}
          size="sm"
          className={`${styles.progressBar} w-[400px]`}
        />
        <span className={styles.time}>12:11</span>
      </div>
    </div>
    <div className={styles.volume}>
      <Volume />
      <Progress
        value={25}
        size="sm"
        className={`${styles.progressBar} w-[100px]`}
      />
    </div>
  </div>
);

export default PlayerBar;
