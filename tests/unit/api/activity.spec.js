import { getActivities, exportActivities } from '@/api/activity';

jest.mock('@/config', () => ({
  instance: {
    get: jest.fn().mockResolvedValue(true),
  },
}));


describe('activity api', () => {
  it('fetches all activities', async () => {
    const activities = await getActivities({ page: 1, type: 'afmin', search: 'edited' });
    expect(activities).toBe(true);
  });
  it('fetches all activities if duration', async () => {
    const activities = await getActivities({ page: 1, type: 'admin', duration: '7days' });
    expect(activities).toBe(true);
  });
  it('exports activities', async () => {
    const adminActivities = await exportActivities({
      startdate: '20-12-2021T01:01:50S',
      enddate: '20-12-2021T01:01:50S',
      fileType: 'csv',
      type: 'admin',
      title: 'admin activities',
    });
    expect(adminActivities).toBe(true);
  });
});
