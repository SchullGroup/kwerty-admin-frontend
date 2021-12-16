import format from 'date-fns/format';

// eslint-disable-next-line
const formatDate = (value) => `${format(new Date(value), 'p')} , ${format(new Date(value), 'd')}-${format(new Date(value), 'MM')}-${format(new Date(value), 'Y')}`;

// eslint-disable-next-line
const formatDateTime = (value) => `${format(new Date(value), 'p')} , ${format(new Date(value), 'd')}-${format(new Date(value), 'MM')}-${format(new Date(value), 'Y')} ${format(new Date(value), 'HH:mm')}`;

export { formatDate, formatDateTime };
