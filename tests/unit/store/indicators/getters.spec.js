import getters from '@/store/modules/indicators/getters';

const { getIndicators } = getters;

const state = {
  indicators: [
    {
      name: 'John Doe',
      email: 'test@test.com',
      createdAt: 'somedate',
    },
  ],
};

describe('Indicators getters', () => {
  it('getIndicators', () => {
    expect(getIndicators(state)).toEqual(state.indicators);
  });
});
