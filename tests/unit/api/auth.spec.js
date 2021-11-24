import {
  login,
  forgotPassword,
  resetPassword,
} from '@/api/auth';

jest.mock('@/config', () => ({
  instance: {
    post: jest.fn().mockResolvedValue(true),
    patch: jest.fn().mockResolvedValue(true),
  },
}));

const user = {
  email: 'test@email.com',
  password: 'my-test-password',
};
const token = 'my-test-token';

describe('auth api', () => {
  it('logs in user', async () => {
    const isLoggedIn = await login({ user });
    expect(isLoggedIn).toBe(true);
  });
  it('forgets user password', async () => {
    const forgot = await forgotPassword({ user });
    expect(forgot).toBe(true);
  });
  it('resets user password', async () => {
    const reset = await resetPassword({ user, token });
    expect(reset).toBe(true);
  });
});
