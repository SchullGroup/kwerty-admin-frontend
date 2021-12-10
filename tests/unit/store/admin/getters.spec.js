import getters from '@/store/modules/admin/getters';

const state = {
  all: [
    { id: 1, firstName: 'Jack', lastName: 'Bauer' },
  ],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    total: 14,
  },
};

const { getAll, getPagination } = getters;
describe('admin getters', () => {
  it('should return admin', () => {
    expect(getAll(state)).toEqual([
      { id: 1, firstName: 'Jack', lastName: 'Bauer' },
    ]);
  });

  it('should return admin pagination', () => {
    expect(getPagination(state)).toEqual({
      currentPage: 1,
      totalPages: 1,
      total: 14,
    });
  });
});
