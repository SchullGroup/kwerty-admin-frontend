import { getActivities } from '@/api/activity';

jest.mock('@/config', () => ({
  instance: {
    get: jest.fn().mockResolvedValue(true),
  },
}));

const adminToken = 'my-test-token';

describe('activity api', () => {
  it('fetches all activities', async () => {
    const activities = await getActivities({ page: 1, type: 'afmin', search: 'edited'});
    expect(activities).toBe(true);
  });
  it('fetches all activities if duration', async () => {
    const activities = await getActivities({ page: 1, type: 'admin', duration: '7days' });
    expect(activities).toBe(true);
  });
});
