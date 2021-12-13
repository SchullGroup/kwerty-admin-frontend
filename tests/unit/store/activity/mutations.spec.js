import mutations from '@/store/modules/activity/mutations';

const { SET_ACTIVITIES } = mutations;

let state = {
  activities: [],
};

describe('SET_ACTIVITIES', () => {
  it('adds activities to the store', () => {
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
