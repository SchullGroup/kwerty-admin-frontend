import getters from '@/store/modules/dashboard/getters';

const { getRecentActivities, getAnalytics } = getters;
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

describe('Indicators getters', () => {
  it('getIndicators', () => {
    expect(getRecentActivities(state)).toEqual(state.recentAdminActivities);
  });
  it('all getters', () => {
    expect(getAnalytics(state)).toEqual(state.analytics);
  });
});
