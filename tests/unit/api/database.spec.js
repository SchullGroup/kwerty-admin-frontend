import {
  uploadData,
  getAllCountryData,
  updateData,
  getSingleData,
  updateDataStatus,
} from '@/api/database';

jest.mock('@/config', () => ({
  instance: {
    get: jest.fn().mockResolvedValue(true),
    post: jest.fn().mockResolvedValueOnce(true),
    put: jest.fn().mockResolvedValueOnce(true),
  },
}));

const formData = {
  file_name: 'some file name',
  size: '15kb',
};

describe('database api', () => {
  it('fetches all datasets', async () => {
    const data = await getAllCountryData({
      params: {
        page: 1,
        category: 'trade',
        frequency: 'yearly',
        search: 'something',
      },
    });
    expect(data).toBe(true);
  });
  it('uploads new data', async () => {
    const data = await uploadData({ formData });
    expect(data).toBe(true);
  });
  it('updates data', async () => {
    const data = await updateData({
      id: '1234erfg786tv6',
      payload: { tags: 'money', metric: 'million', notes: 'someNotes' },
    });
    expect(data).toBe(true);
  });
  it('gets single data', async () => {
    const data = await getSingleData({
      id: '1234erfg786tv6',
    });
    expect(data).toBe(true);
  });
  it('updates data status', async () => {
    const data = await updateDataStatus();
    expect(data).toBe();
  });
});
