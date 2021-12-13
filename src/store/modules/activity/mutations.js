export default {
  SET_ACTIVITIES: (state, payload) => {
    state.activities = payload;
  },
  SET_USER_ACTIVITIES: (state, payload) => {
    state.userActivities = payload;
  },
};
