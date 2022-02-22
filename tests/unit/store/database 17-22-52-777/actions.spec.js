import actions from '@/store/modules/database/actions';

const errorResponse = {
  error: 'Error while performing action',
};

jest.mock('@/api/database', () => ({
  __esModule: true,
  getAllCountryData: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        data: {
          message: 'Data fetched',
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
  uploadData: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        message: 'Data uploaded successfully',
      },
    })
    .mockRejectedValueOnce({
      response: {
        data: {
          message: 'Error while performing action',
        },
      },
    }),
  getSingleData: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        data: {
          message: 'Data fetched',
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
  updateDataStatus: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        message: 'Data status updated',
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

const {
  fetchDatabase, uploadCSV, fetchDataById, performDataAction,
} = actions;

const commit = jest.fn();

describe('database actions', () => {
  it('uploads dataset csv', async () => {
    const indicators = await uploadCSV({ commit }, 1);
    expect(indicators).toEqual('Data uploaded successfully');
  });
  it('uploads dataset csv error', async () => {
    const database = await uploadCSV({ commit }, 1);
    expect(database).toEqual(errorResponse);
  });
  it('Fetched all database', async () => {
    const indicators = await fetchDatabase({ commit }, 1);
    expect(indicators).toEqual({ message: 'Data fetched' });
  });
  it('Fetched all database error', async () => {
    const database = await fetchDatabase({ commit }, 1);
    expect(database).toEqual(errorResponse);
  });
  it('Fetched database by id', async () => {
    const indicators = await fetchDataById(1);
    expect(indicators).toEqual({ message: 'Data fetched' });
  });
  it('Fetched database by id error', async () => {
    const database = await fetchDataById(1);
    expect(database).toEqual(errorResponse);
  });
  it('Fetched database by id', async () => {
    const indicators = await performDataAction({ payload: {} });
    expect(indicators).toEqual('Data status updated');
  });
  it('Fetched database by id error', async () => {
    const database = await performDataAction({ payload: {} });
    expect(database).toEqual(errorResponse);
  });
});
