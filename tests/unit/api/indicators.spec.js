import {
  addIndicator,
  getIndicators,
  deleteIndicator,
  updateIndicator,
  getIndicatorsList,
  searchIndicators,
} from '@/api/indicators';

jest.mock('@/config', () => ({
  instance: {
    get: jest.fn().mockResolvedValue(true),
    post: jest.fn().mockResolvedValueOnce(true),
    delete: jest.fn().mockResolvedValueOnce(true),
    put: jest.fn().mockResolvedValueOnce(true),
  },
}));

const indicatorMock = {
  name: 'indicator name',
  category: 'health',
  frequency: 'yearly',
};

describe('indicator api', () => {
  it('fetches all indicators', async () => {
    // eslint-disable-next-line vue/max-len
    const indicators = await getIndicators({
      page: 1, search: 'searchword', category: 'trade', frequency: 'yearly',
    });
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
  it('updates indicator', async () => {
    const indicator = await updateIndicator({ id: '23456tyfvh897654', indicator: {} });
    expect(indicator).toBe(true);
  });
  it('gets indicator', async () => {
    const indicator = await getIndicatorsList();
    expect(indicator).toBe(true);
  });
  it('searches indicator', async () => {
    const indicator = await searchIndicators({ name: 'Official Assets' });
    expect(indicator).toBe(true);
  });
});
