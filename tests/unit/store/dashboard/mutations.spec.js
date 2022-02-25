import mutations from '@/store/modules/dashboard/mutations';

const { SET_RECENT_ACTIVITIES, SET_ANALYTICS } = mutations;

const state = {
  recentAdminActivities: [
    {
      name: 'some admin name',
    },
  ],
  analytics: [
    {
      some: 'analytics',
    },
  ],
};

describe('dashboard mutations', () => {
  it('adds admin recent activities to the store', () => {
    const newRecentActivities = [
      {
        name: 'some admin name',
      },
    ];
    SET_RECENT_ACTIVITIES(state, newRecentActivities);
    expect(state.recentAdminActivities).toBe(newRecentActivities);
  });
  it('adds admin dashboard analytics to the store', () => {
    const newAnalytics = [
      {
        some: 'analytics',
      },
    ];
    SET_ANALYTICS(state, newAnalytics);
    expect(state.analytics).toBe(newAnalytics);
  });
});
