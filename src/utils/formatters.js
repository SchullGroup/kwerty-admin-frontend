import format from 'date-fns/format';

export default {
  // eslint-disable-next-line
   formatDate(value){ return  `${format(new Date(value), 'p')} , ${format(new Date(value), 'd')}-${format(new Date(value), 'MM')}-${format(new Date(value), 'Y')}`;}
};
