import actions from '@/store/modules/roles/actions';

jest.mock('@/api', () => ({
  __esModule: true,
  getAllRoles: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        data: [{ id: 1, name: 'super_admin' }],
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

const { fetchAll } = actions;
const commit = jest.fn();
// const dispatch = jest.fn().mockResolvedValue({ key: 'value' });

describe('roles store actions', () => {
  const token = 'some_key';
  // const roles = [{ id: 1, name: 'super_admin' }];

  it('fetches all roles', async () => {
    const response = await fetchAll({ commit }, { token });
    expect(response).toEqual([{ id: 1, name: 'super_admin' }]);
  });

  it('handles failed fetch correctly', async () => {
    const response = await fetchAll({ commit }, { token });
    expect(response).toEqual({
      error: 'Error while performing action',
    });
  });
});
