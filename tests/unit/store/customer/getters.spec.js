import getters from '@/store/modules/customers/getters';

const { getCustomers, getCustomerActivities } = getters;

const state = {
  allCustomers: [
    {
      name: 'John Doe',
      email: 'test@test.com',
      createdAt: 'somedate',
    },
  ],
  singleUserActivities: [
    {
      name: 'John Doe',
      email: 'test@test.com',
      createdAt: 'somedate',
      activity: 'logged in',
    },
  ],
};

describe('Customers getters', () => {
  it('getcustomers', () => {
    expect(getCustomers(state)).toEqual(state.allCustomers);
  });
  it('getUserActivities', () => {
    expect(getCustomerActivities(state)).toEqual(state.singleUserActivities);
  });
});
