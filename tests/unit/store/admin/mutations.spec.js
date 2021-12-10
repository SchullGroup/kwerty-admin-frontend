import mutations from '@/store/modules/admin/mutations';

const state = {
  all: [],
  pagination: {},
};

const { SET_ADMIN, SET_ADMIN_PAGINATION } = mutations;
describe('admin mutations', () => {
  it('should set admin', () => {
    SET_ADMIN(state, { id: 1, firstName: 'Jack', lastName: 'Bauer' });
    expect(state.all).toEqual({ id: 1, firstName: 'Jack', lastName: 'Bauer' });
  });

  it('should set admin pagination', () => {
    SET_ADMIN_PAGINATION(state, {
      currentPage: '1',
      totalPages: '1',
      total: '14',
    });
    expect(state.pagination).toEqual({
      currentPage: 1,
      totalPages: 1,
      total: 14,
    });
  });
});
