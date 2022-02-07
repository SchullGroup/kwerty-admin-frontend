export default {
  SET_ALL_CUSTOMERS: (state, payload) => {
    state.allCustomers = payload;
  },
  SET_SINGLE_CUSTOMER_ACTIVITIES: (state, payload) => {
    state.singleUserActivities = payload;
  },
};
