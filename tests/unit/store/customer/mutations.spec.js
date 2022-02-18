import mutations from '@/store/modules/customers/mutations';

const { SET_ALL_CUSTOMERS, SET_SINGLE_CUSTOMER_ACTIVITIES } = mutations;

const state = {
  allCustomers: [],
  singleUserActivities: [],
};

describe('SET_ALL_CUSTOMERS', () => {
  it('adds all customers activities to the store', () => {
    const allActivities = [
      {
        name: 'some-name',
        email: 'sm@gmail.com',
      },
    ];
    SET_ALL_CUSTOMERS(state, allActivities);
    expect(state.allCustomers).toBe(allActivities);
  });
});
describe('SET_SINGLE_CUSTOMER_ACTIVITIES', () => {
  it('set customer activities to the store', () => {
    const userActivities = [
      {
        name: 'some-name',
        email: 'sm@gmail.com',
      },
    ];
    SET_SINGLE_CUSTOMER_ACTIVITIES(state, userActivities);
    expect(state.singleUserActivities).toBe(userActivities);
  });
});
