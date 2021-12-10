import getters from '@/store/modules/roles/getters';

const state = {
  all: [{ id: 1, name: 'super_admin' }],
};

const { getAll } = getters;
describe('roles getters', () => {
  it('should return roles', () => {
    expect(getAll(state)).toEqual([{ id: 1, name: 'super_admin' }]);
  });
});
