import stringListToOptions from '@/utils/stringListToOptions';

export default {
  getIndicators: (state) => state.indicators,
  all: (state) => state.list,
  asOptions: (state) => stringListToOptions(state.list),
  categories: (state) => state.categories,
  categoryOptions: (state) => stringListToOptions(state.categories),
};
