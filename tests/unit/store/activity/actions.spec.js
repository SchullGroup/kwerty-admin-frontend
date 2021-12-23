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
  exportActivities: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        message: 'data returned succesfully',
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

const { getActivities, exportActivities } = actions;

const commit = jest.fn();
const dispatch = jest.fn();

const body = { type: 'admin' };

describe('activity actions', () => {
  it('Fetched all admin activities', async () => {
    const activitiesFetched = await getActivities({ commit }, {body: { type: 'admin' }});
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
  it('export activities', async () => {
    const exported = await exportActivities({ dispatch }, 1);
    expect(exported).toEqual({ message: 'data returned succesfully' });
  });
  it('export activities error', async () => {
    const exported = await exportActivities({ dispatch }, 1);
    expect(exported).toEqual(errorResponse);
  });
});
