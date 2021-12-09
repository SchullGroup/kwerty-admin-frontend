import getters from '@/store/modules/activity/getters';

const { getActivities } = getters;

const state = {
  activities: [
    {
      name: 'John Doe',
      email: 'test@test.com',
      createdAt: 'somedate',
    },
  ],
};

describe('Activity getters', () => {
  it('getActivities', () => {
    expect(getActivities(state)).toEqual(state.activities);
  });
});
