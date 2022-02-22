import mutations from '@/store/modules/database/mutations';

const { SET_DATABASE } = mutations;

const state = {
  database: [
    {
      some: 'analytics',
    },
  ],
};

describe('database mutations', () => {
  it('adds database to the store', () => {
    const dataset = [
      {
        name: 'some admin name',
      },
    ];
    SET_DATABASE(state, dataset);
    expect(state.database).toBe(dataset);
  });
});
