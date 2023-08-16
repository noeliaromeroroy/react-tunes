import moment from 'moment';

export const formatDate = (inputDate: Date) => {
    const now = moment();
    const date = moment(inputDate);

    // Si es hoy pero no es tan reciente
    if (date.isSame(now, 'day')) {
        const hoursAgo = now.diff(date, 'hours');

        if (hoursAgo === 1) {
            return 'an hour ago';
        } else {
            return `${hoursAgo} hours ago`;
        }
    }

    // Si fue ayer
    if (date.isSame(now.clone().subtract(1, 'days'), 'day')) {
        return 'yesterday';
    }

    // Si es hace menos de una semana pero no es hoy
    if (date.isAfter(now.subtract(7, 'days')) && !date.isSame(now, 'day')) {
        return `last ${date.format('dddd').toLowerCase()}`;
    }

    // Si es el mismo año
    if (date.isSame(now, 'year')) {
        return date.format('DD/MMM');
    }

    // Otros
    return date.format('DD/MM/YYYY');
};

export const millisToMinutesAndSeconds = (millis: number) => {
    let totalSeconds = Math.floor(millis / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    return (
        minutes.toString().padStart(2, '0') +
        ':' +
        seconds.toString().padStart(2, '0')
    );
};