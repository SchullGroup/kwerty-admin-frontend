import listToOptions from '@/utils/stringListToOptions';

export default {
  getIndicators: (state) => state.indicators,
  all: (state) => state.list,
  asOptions({ list, loadedList }) {
    return (category) => {
      if (category) {
        const lowerCat = category.toLocaleLowerCase();
        return listToOptions(
          loadedList
            .filter((i) => i.category === lowerCat).map((i) => i.name)
            .slice(0, 100),
          'Indicators',
        );
      }
      return listToOptions(list.slice(0, 100), 'Indicators');
    };
  },
  categories: (state) => state.categories,
  categoryOptions: (state) => listToOptions(state.categories, 'Categories'),
};
