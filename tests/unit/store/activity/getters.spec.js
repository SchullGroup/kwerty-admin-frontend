import getters from '@/store/modules/activity/getters';

const { getActivities, getUserActivities } = getters;

const state = {
  activities: [
    {
      name: 'John Doe',
      email: 'test@test.com',
      createdAt: 'somedate',
    },
  ],
  userActivities: [
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
  it('getUserActivities', () => {
    expect(getUserActivities(state)).toEqual(state.userActivities);
  });
});
