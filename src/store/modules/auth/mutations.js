export default {
  SET_USER: (state, payload) => {
    state.user = payload;
  },
  SET_TOKEN: (state, payload) => {
    state.token = payload;
  },
  RESET: (state) => {
    state.user = {};
    state.profile = {};
    state.token = null;
  },
  SET_ADMIN_PROFILE: (state, payload) => {
    state.profile = payload;
  },
};
