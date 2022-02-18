import actions from '@/store/modules/customers/actions';

const errorResponse = {
  error: 'Error while performing action',
};

jest.mock('@/api/customers', () => ({
  __esModule: true,
  getAllCustomers: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        data: {
          customers: [
            {
              name: 'superAdmin',
              email: 'test@example.com',
              isVerified: true,
            },
            {
              name: 'superAdmin',
              email: 'test@example.com',
              isVerified: true,
            },
          ],
        },
      },
    })
    .mockRejectedValueOnce({
      response: {
        data: {
          message: 'Error while performing action',
        },
      },
    }),
  changeCustomerStatus: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        message: 'customer status updated',
      },
    })
    .mockRejectedValueOnce({
      response: {
        data: {
          message: 'Error while performing action',
        },
      },
    }),
  singleCustomerActivities: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        data: {
          message: 'data returned succesfully',
        },
      },
    })
    .mockRejectedValueOnce({
      response: {
        data: {
          message: 'Error while performing action',
        },
      },
    }),
}));

const { getAllCustomers, changeCustomerStatus, singleCustomerActivities } = actions;

const commit = jest.fn();
const dispatch = jest.fn();

// const body = { type: 'admin' };

describe('customers actions', () => {
  it('Fetched all customers', async () => {
    const customers = await getAllCustomers({ commit }, 1);
    expect(customers).toEqual({
      customers: [
        {
          name: 'superAdmin',
          email: 'test@example.com',
          isVerified: true,
        },
        {
          name: 'superAdmin',
          email: 'test@example.com',
          isVerified: true,
        },
      ],
    });
  });
  it('Fetched all customers error', async () => {
    const customers = await getAllCustomers({ commit }, 1);
    expect(customers).toEqual(errorResponse);
  });
  it('change customer status', async () => {
    const status = await changeCustomerStatus({ dispatch }, 1);
    expect(status).toEqual('customer status updated');
  });
  it('change customer status error', async () => {
    const status = await changeCustomerStatus({ dispatch }, 1);
    expect(status).toEqual(errorResponse);
  });
  it('get single customer activities', async () => {
    const activities = await singleCustomerActivities({ commit }, 1);
    expect(activities).toEqual({ message: 'data returned succesfully' });
  });
  it('get single customer activities error', async () => {
    const activities = await singleCustomerActivities({ commit }, 1);
    expect(activities).toEqual(errorResponse);
  });
});
