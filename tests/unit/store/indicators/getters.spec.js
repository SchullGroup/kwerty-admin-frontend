import getters from '@/store/modules/indicators/getters';

const {
  getIndicators,
  all,
  // asOptions,
  categories,
  // categoryOptions,
} = getters;

const state = {
  indicators: [
    {
      name: 'John Doe',
      email: 'test@test.com',
      createdAt: 'somedate',
    },
  ],
  list: [{
    '': 'All Indicators',
    options: [
      {
        name: 'some indicator name',
        category: 'monetary',
        metric: 'million',
        createdAt: 'somedate',
      },
      {
        name: 'some indicator name',
        category: 'monetary',
        metric: 'million',
        createdAt: 'somedate',
      },
      {
        name: 'some indicator name',
        category: 'monetary',
        metric: 'million',
        createdAt: 'somedate',
      },
    ],
  },
  ],
  categories: {
    '': 'All Categories',
    agriculture: 'Agriculture',
    economy: 'Economy',
    monetary: 'Monetary',
  },
};

// jest.mock('@/utils', () => ({
//   stringListToOptions: {
//     reduce: [],
//   },
// }));

describe('Indicators getters', () => {
  it('getIndicators', () => {
    expect(getIndicators(state)).toEqual(state.indicators);
  });
  it('all getters', () => {
    expect(all(state)).toEqual(state.list);
  });
  // it('asOptions getters', () => {
  //   expect(asOptions(state)).toEqual(state.list);
  // });
  it('categories getters', () => {
    expect(categories(state)).toEqual(state.categories);
  });
  // it('categoryoptions getters', () => {
  //   expect(categoryOptions(state)).toEqual(state.categories);
  // });
});
