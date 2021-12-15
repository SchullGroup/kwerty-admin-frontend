import { addIndicator, getIndicators, deleteIndicator } from '@/api/indicators';

jest.mock('@/config', () => ({
  instance: {
    get: jest.fn().mockResolvedValue(true),
    post: jest.fn().mockResolvedValueOnce(true),
    delete: jest.fn().mockResolvedValueOnce(true),
  },
}));

const indicatorMock = {
  name: 'indicator name',
  category: 'health',
  frequency: 'yearly',
};

describe('activity api', () => {
  it('fetches all indicators', async () => {
    const indicators = await getIndicators({ page: 1, search: 'searchword' });
    expect(indicators).toBe(true);
  });
  it('adds new indicator', async () => {
    const indicator = await addIndicator({ indicatorMock });
    expect(indicator).toBe(true);
  });
  it('deletes indicator', async () => {
    const indicator = await deleteIndicator({ body: ['ids', 'idss'] });
    expect(indicator).toBe(true);
  });
});
