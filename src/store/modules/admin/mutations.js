export default {
  SET_ADMIN: (state, payload) => {
    state.all = payload;
  },
  SET_ADMIN_PAGINATION: (state, payload) => {
    Object.keys(payload).forEach((key) => {
      state.pagination[key] = parseInt(payload[key], 10);
    });
  },
};
