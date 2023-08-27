import moment from 'moment';

export const formatDate = (inputDate: Date) => {
  const now = moment();
  const date = moment(inputDate);

  // Today
  if (date.isSame(now, 'day')) {
    const hoursAgo = now.diff(date, 'hours');

    // Hours ago
    if (hoursAgo === 1) {
      return 'an hour ago';
    }
    return `${hoursAgo} hours ago`;
  }

  // Yesterday
  if (date.isSame(now.clone().subtract(1, 'days'), 'day')) {
    return 'yesterday';
  }

  // Less than one week, but not today nor yesterday
  if (date.isAfter(now.subtract(7, 'days')) && !date.isSame(now, 'day')) {
    return `last ${date.format('dddd').toLowerCase()}`;
  }

  // Same year
  if (date.isSame(now, 'year')) {
    return date.format('DD/MMM');
  }

  // Default
  return date.format('DD/MM/YYYY');
};

export const millisToMinutesAndSeconds = (millis: number) => {
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
