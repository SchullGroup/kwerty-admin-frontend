import mutations from '@/store/modules/roles/mutations';

const state = {
  all: [],
  allDetails: [],
};

const { SET_ROLES, SET_ROLES_DETAILS } = mutations;
describe('admin mutations', () => {
  it('should set role', () => {
    SET_ROLES(state, [{ id: 1, name: 'super_admin' }]);
    expect(state.all).toEqual([{ id: 1, name: 'super_admin' }]);
  });
  it('should set role details', () => {
    SET_ROLES_DETAILS(state, [{ id: 1, name: 'super_admin' }]);
    expect(state.allDetails).toEqual([{ id: 1, name: 'super_admin' }]);
  });
});
