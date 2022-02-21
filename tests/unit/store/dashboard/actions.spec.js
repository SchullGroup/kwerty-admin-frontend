import actions from '@/store/modules/dashboard/actions';

const errorResponse = {
  error: 'Error while performing action',
};

jest.mock('@/api/dashboard', () => ({
  __esModule: true,
  getRecentAdminActivities: jest
    .fn()
    .mockResolvedValueOnce({
      data: {},
    })
    .mockRejectedValueOnce({
      response: {
        data: {
          message: 'Error while performing action',
        },
      },
    }),
  getAnalytics: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        message: 'Analytics returned successfully',
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

const { getRecentAdminActivities, getAnalytics } = actions;

const commit = jest.fn();

describe('dashboard actions', () => {
  it('gets recent activities', async () => {
    const activities = await getRecentAdminActivities({ commit }, 1);
    expect(activities).toEqual();
  });
  it('gets recent activities error', async () => {
    const activities = await getRecentAdminActivities({ commit }, 1);
    expect(activities).toEqual(errorResponse);
  });
  it('gets recent activities', async () => {
    const activities = await getAnalytics({ commit }, 1);
    expect(activities).toEqual({ message: 'Analytics returned successfully' });
  });
  it('gets recent activities error', async () => {
    const activities = await getAnalytics({ commit }, 1);
    expect(activities).toEqual(errorResponse);
  });
});
