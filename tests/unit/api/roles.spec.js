import {
  getAllRoles,
  getSomething,
} from '@/api';

jest.mock('@/config', () => ({
  instance: {
    get: jest.fn().mockResolvedValue(true),
  },
}));

const token = 't1h2e3q4u5i6c7k8b9r1o2w3n4f5o6x';

describe('roles api', () => {
  it('fetches all roles', async () => {
    const roles = await getAllRoles((token));
    getSomething();
    expect(roles).toBeTruthy();
  });
});
