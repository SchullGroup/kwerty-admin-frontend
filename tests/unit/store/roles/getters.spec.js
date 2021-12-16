import getters from '@/store/modules/roles/getters';

const details = [
  {
    id: '1',
    name: 'super_admin',
    description: 'some description',
    permissions: {
      dataset: ['create'],
      role: [],
      admin: [],
      indicator: [],
      activity: [],
    },
  },
];

const state = {
  all: [{ id: 1, name: 'super_admin' }],
  allDetails: details,
};

const { getAll, getAllDetails } = getters;
describe('roles getters', () => {
  it('should return roles', () => {
    expect(getAll(state)).toEqual([{ id: 1, name: 'super_admin' }]);
  });

  it('should return roles details', () => {
    expect(getAllDetails(state)).toEqual(details);
  });
});
