import mutations from '@/store/modules/roles/mutations';

const state = {
  all: [],
};

const { SET_ROLES } = mutations;
describe('admin mutations', () => {
  it('should set admin', () => {
    SET_ROLES(state, [{ id: 1, name: 'super_admin' }]);
    expect(state.all).toEqual([{ id: 1, name: 'super_admin' }]);
  });
});
