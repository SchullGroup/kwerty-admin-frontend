export default {
  SET_RECENT_ACTIVITIES: (state, payload) => {
    state.recentAdminActivities = payload;
  },
  SET_ANALYTICS: (state, payload) => {
    state.analytics = payload;
  },
};
