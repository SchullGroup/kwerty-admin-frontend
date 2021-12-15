import actions from '@/store/modules/indicators/actions';

const errorResponse = {
  error: 'Error while performing action',
};

jest.mock('@/api/indicators', () => ({
  __esModule: true,
  getIndicators: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        data: {
          name: 'superAdmin',
          category: 'health',
          frequency: 'yearly',
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
  addIndicator: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        message: 'Indicator added successfully',
      },
    })
    .mockRejectedValueOnce({
      response: {
        data: {
          message: 'Error while performing action',
        },
      },
    }),
  deleteIndicator: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        message: 'Indicator deleted successfully',
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

const { deleteIndicator, addIndicator, getIndicators } = actions;

const commit = jest.fn();
const dispatch = jest.fn();

describe('indicators actions', () => {
  it('Fetched all indicators', async () => {
    const indicators = await getIndicators({ commit }, 1);
    expect(indicators).toEqual({
      name: 'superAdmin',
      category: 'health',
      frequency: 'yearly',
    });
  });
  it('Fetched all indicators error', async () => {
    const activitiesFetched = await getIndicators({ commit }, 1);
    expect(activitiesFetched).toEqual(errorResponse);
  });
  it('Adds new indicator', async () => {
    const indicator = await addIndicator({ dispatch }, 1);
    expect(indicator).toEqual('Indicator added successfully');
  });
  it('Adds new indicator error', async () => {
    const indicator = await addIndicator({ dispatch }, 1);
    expect(indicator).toEqual(errorResponse);
  });
  it('Deletes indicator', async () => {
    const indicator = await deleteIndicator({ dispatch }, 1);
    expect(indicator).toEqual('Indicator deleted successfully');
  });
  it('Deletes indicator error', async () => {
    const indicator = await deleteIndicator({ dispatch }, 1);
    expect(indicator).toEqual(errorResponse);
  });
});
