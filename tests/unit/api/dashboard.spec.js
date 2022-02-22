import { getRecentAdminActivities, getAnalytics, getActiveUsers } from '@/api/dashboard';

jest.mock('@/config', () => ({
  instance: {
    get: jest.fn().mockResolvedValue(true),
  },
}));

describe('dashboard api', () => {
  it('fetches all recent admin activities', async () => {
    const activities = await getRecentAdminActivities({ id: '3456tfxfg7655w', duration: '7 days' });
    expect(activities).toBe(true);
  });
  it('gets dash analytics', async () => {
    const status = await getAnalytics({ duration: '7 days' });
    expect(status).toBe(true);
  });
  it('gets active users', async () => {
    const indicator = await getActiveUsers({ duration: '24 hours' });
    expect(indicator).toBe(true);
  });
});
