import { getActivities } from '@/api/activity';

jest.mock('@/config', () => ({
  instance: {
    get: jest.fn().mockResolvedValue(true),
  },
}));

const adminToken = 'my-test-token';

describe('activity api', () => {
  it('fetches all activities', async () => {
    const activities = await getActivities({ adminToken });
    expect(activities).toBe(true);
  });
});
