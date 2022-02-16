import mutations from '@/store/modules/indicators/mutations';

const { SET_INDICATORS } = mutations;

const state = {
  indicators: [],
};

describe('SET_INDICATORS', () => {
  it('adds admin indicators to the store', () => {
    const newIndicators = [
      {
        name: 'some-name',
        email: 'sm@gmail.com',
      },
    ];
    SET_INDICATORS(state, newIndicators);
    expect(state.indicators).toBe(newIndicators);
  });
});
