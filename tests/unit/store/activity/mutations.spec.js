import mutations from '@/store/modules/activity/mutations';

const { SET_ACTIVITIES, SET_USER_ACTIVITIES } = mutations;

const state = {
  activities: [],
  userActivities: [],
};

describe('SET_ACTIVITIES', () => {
  it('adds admin activities to the store', () => {
    const allActivities = [
      {
        name: 'some-name',
        email: 'sm@gmail.com',
      },
    ];
    SET_ACTIVITIES(state, allActivities);
    expect(state.activities).toBe(allActivities);
  });
});
describe('SET_USER_ACTIVITIES', () => {
  it('adds user activities to the store', () => {
    const userActivities = [
      {
        name: 'some-name',
        email: 'sm@gmail.com',
      },
    ];
    SET_USER_ACTIVITIES(state, userActivities);
    expect(state.userActivities).toBe(userActivities);
  });
});
