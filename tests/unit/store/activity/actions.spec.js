import actions from '@/store/modules/activity/actions';

const errorResponse = {
  error: 'Error while performing action',
};

jest.mock('@/api/activity', () => ({
  __esModule: true,
  getActivities: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        data: {
          name: 'superAdmin',
          activity: 'test@example.com',
          status: 'test',
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
  getUserActivities: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        data: {
          name: 'superAdmin',
          activity: 'test@example.com',
          status: 'test',
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

const { getActivities, getUserActivities } = actions;

const commit = jest.fn();

describe('activity actions', () => {
  it('Fetched all admin activities', async () => {
    const activitiesFetched = await getActivities({ commit }, 1);
    expect(activitiesFetched).toEqual({
      name: 'superAdmin',
      activity: 'test@example.com',
      status: 'test',
    });
  });
  it('Fetched all admin activities error', async () => {
    const activitiesFetched = await getActivities({ commit }, 1);
    expect(activitiesFetched).toEqual(errorResponse);
  });
  it('Fetched all user activities', async () => {
    const activitiesFetched = await getUserActivities({ commit }, 1);
    expect(activitiesFetched).toEqual({
      name: 'superAdmin',
      activity: 'test@example.com',
      status: 'test',
    });
  });
  it('Fetched all user activities error', async () => {
    const activitiesFetched = await getUserActivities({ commit }, 1);
    expect(activitiesFetched).toEqual(errorResponse);
  });
});
