import stringListToOptions from '@/utils/stringListToOptions';

export default {
  getIndicators: (state) => state.indicators,
  all: (state) => state.list,
  asOptions: (state) => {
    const options = stringListToOptions(state.list);
    options[''] = 'All Indicators';
    return options;
  },
  categories: (state) => state.categories,
  categoryOptions: (state) => {
    const options = stringListToOptions(state.categories);
    options[''] = 'All Categories';
    return options;
  },
};
