import getters from '@/store/modules/database/getters';

const { getDatabase } = getters;
const state = {
  database: [
    {
      name: 'some data',
    },
  ],
};

describe('Database getters', () => {
  it('get database', () => {
    expect(getDatabase(state)).toEqual(state.database);
  });
});
