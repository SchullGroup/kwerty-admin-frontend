import actions from '@/store/modules/admin/actions';

jest.mock('@/api', () => ({
  __esModule: true,
  getAllAdmin: jest.fn().mockResolvedValueOnce({
    data: {
      data: {
        admin: [
          { id: 1, firstName: 'Jack', lastName: 'Bauer' },
        ],
        currentPage: 1,
        totalPages: 2,
        total: 14,
      },
    },
  }).mockRejectedValueOnce({
    response: {
      data: {
        message: 'Error while performing action',
      },
    },
  }),

  addAdmin: jest.fn().mockResolvedValueOnce({
    data: {
      message: 'Successfully added admin',
    },
  }).mockRejectedValueOnce({
    response: {
      data: {
        message: 'Error while performing action',
      },
    },
  }),

  editOtherAdmin: jest.fn().mockResolvedValueOnce({
    data: {
      message: 'Successfully updated admin',
    },
  }).mockRejectedValueOnce({
    response: {
      data: {
        message: 'Error while performing action',
      },
    },
  }),

  deleteOtherAdmin: jest.fn().mockResolvedValueOnce({
    data: {
      message: 'Successfully deleted admin',
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
  fetchAll, addAdmin, editOtherAdmin, deleteOtherAdmin,
} = actions;
const commit = jest.fn();
const dispatch = jest.fn().mockResolvedValue({ key: 'value' });

describe('admin store actions', () => {
  const token = 'some_key';
  const admin = { id: 1, firstName: 'Jack', lastName: 'Bauer' };

  Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: jest.fn().mockResolvedValue(true),
  });

  it('fetches all admins', async () => {
    const response = await fetchAll({ commit }, { token });
    expect(response).toEqual({
      admin: [
        { id: 1, firstName: 'Jack', lastName: 'Bauer' },
      ],
      currentPage: 1,
      totalPages: 2,
      total: 14,
    });
  });

  it('handles failed fetch correctly', async () => {
    const response = await fetchAll({ commit }, { token });
    expect(response).toEqual({
      error: 'Error while performing action',
    });
  });

  it('adds new admin', async () => {
    const response = await addAdmin({ dispatch }, { token, admin });
    expect(response).toMatch('Successfully added admin');
  });

  it('handles failed admin add', async () => {
    const response = await addAdmin({ dispatch }, { token, admin });
    expect(response).toEqual({
      error: 'Error while performing action',
    });
  });

  it('updates other admin', async () => {
    const response = await editOtherAdmin({ dispatch }, { token, admin });
    expect(response).toMatch('Successfully updated admin');
  });

  it('handles failed admin update', async () => {
    const response = await editOtherAdmin({ dispatch }, { token, admin });
    expect(response).toEqual({
      error: 'Error while performing action',
    });
  });

  it('delete other admin', async () => {
    const response = await deleteOtherAdmin({ dispatch }, { token, admin });
    expect(response).toMatch('Successfully deleted admin');
  });

  it('handles failed admin delete', async () => {
    const response = await deleteOtherAdmin({ dispatch }, { token, admin });
    expect(response).toEqual({
      error: 'Error while performing action',
    });
  });
});
