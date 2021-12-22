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
  getAllRolesDetails: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        data: {
          roles: [
            {
              id: '1',
              name: 'super_admin',
              description: 'some description',
              permissions: {
                dataset: ['create'],
                role: [],
                admin: [],
                indicator: [],
                activity: [],
              },
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

  addRole: jest.fn().mockResolvedValueOnce({
    data: {
      message: 'Successfully added role',
    },
  }).mockRejectedValueOnce({
    response: {
      data: {
        message: 'Error while performing action',
      },
    },
  }),

  editRole: jest.fn().mockResolvedValueOnce({
    data: {
      message: 'Successfully edited role',
    },
  }).mockRejectedValueOnce({
    response: {
      data: {
        message: 'Error while performing action',
      },
    },
  }),

  deleteRole: jest.fn().mockResolvedValueOnce({
    data: {
      message: 'Successfully deleted role',
    },
  }).mockRejectedValueOnce({
    response: {
      data: {
        message: 'Error while performing action',
      },
    },
  }),
}));

const {
  fetchAll, fetchDetails, addRole, editRole, deleteRole,
} = actions;
const commit = jest.fn();
const dispatch = jest.fn().mockResolvedValue({ key: 'value' });
const role = { id: 10, name: 'data engineer' };
const id = 1;

describe('roles store actions', () => {
  const token = 'some_key';
  // const roles = [{ id: 1, name: 'super_admin' }];
  // FETCHES ROLES

  Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: jest.fn().mockResolvedValue(true),
  });

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

  // FETCH ROLE DETAILS
  it('fetches all roles details', async () => {
    const response = await fetchDetails({ commit }, { page: 1 });
    expect(response).toEqual([
      {
        id: '1',
        name: 'super_admin',
        description: 'some description',
        permissions: {
          dataset: ['create'],
          role: [],
          admin: [],
          indicator: [],
          activity: [],
        },
      },
    ]);
  });
  it('handles failed roles details fetch correctly', async () => {
    const response = await fetchDetails({ commit }, { token });
    expect(response).toEqual({
      error: 'Error while performing action',
    });
  });

  // ADD ROLE
  it('adds new role', async () => {
    const response = await addRole({ dispatch }, { token, role });
    expect(response).toMatch('Successfully added role');
  });
  it('handles failed role add', async () => {
    const response = await addRole({ dispatch }, { token, role });
    expect(response).toEqual({
      error: 'Error while performing action',
    });
  });

  // EDIT ROLE
  it('edits role', async () => {
    const response = await editRole({ dispatch }, { token, role });
    expect(response).toMatch('Successfully edited role');
  });
  it('handles failed role edit', async () => {
    const response = await editRole({ dispatch }, { token, role });
    expect(response).toEqual({
      error: 'Error while performing action',
    });
  });

  // DELETE ROLE
  it('deletes role', async () => {
    const response = await deleteRole({ dispatch }, { id });
    expect(response).toMatch('Successfully deleted role');
  });
  it('handles failed role delete', async () => {
    const response = await deleteRole({ dispatch }, { id });
    expect(response).toEqual({
      error: 'Error while performing action',
    });
  });
});
