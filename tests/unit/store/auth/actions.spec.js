import actions from '@/store/modules/auth/actions';

const errorResponse = {
  error: 'Error while performing action',
};

jest.mock('@/api/auth', () => ({
  __esModule: true,
  login: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        data: {
          token: 'my-test-token',
          email: 'test@example.com',
          firstName: 'test',
          lastName: 'example',
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
  forgotPassword: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        message: 'password forgotten',
      },
    })
    .mockRejectedValueOnce({
      response: {
        data: {
          message: 'Error while performing action',
        },
      },
    }),
  resetPassword: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        message: 'password has been reset',
      },
    })
    .mockRejectedValueOnce({
      response: {
        data: {
          message: 'Error while performing action',
        },
      },
    }),
  getProfile: jest
    .fn()
    .mockResolvedValueOnce({
      data: {
        data: {
          roleName: 'superAdmin',
          email: 'test@example.com',
          firstName: 'test',
          lastName: 'example',
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
}));

const {
  login, forgotPassword, resetPassword, getProfile,
} = actions;
const testUser = {
  email: 'test@xample.com',
  password: 'mypassword',
};
const commit = jest.fn();

describe('Auth Actions', () => {
  it('logs user in', async () => {
    const userLoggedIn = await login({ commit }, testUser);
    expect(userLoggedIn).toEqual({
      token: 'my-test-token',
      email: 'test@example.com',
      firstName: 'test',
      lastName: 'example',
    });
  });
  it('handles error on login', async () => {
    const userLoggedIn = await login({ commit }, testUser);
    expect(userLoggedIn).toEqual(errorResponse);
  });
  it('forgets the users password', async () => {
    const forgot = await forgotPassword({ commit }, { email: testUser.email });
    expect(forgot).toEqual('password forgotten');
  });
  it('handles forgot password error', async () => {
    const forgot = await forgotPassword({ commit }, { email: testUser.email });
    expect(forgot).toEqual(errorResponse);
  });
  it('resets the users password', async () => {
    const reset = await resetPassword({ commit }, { password: testUser.password });
    expect(reset).toEqual('password has been reset');
  });
  it('handles reset password error', async () => {
    const reset = await resetPassword({ commit }, { password: testUser.password });
    expect(reset).toEqual(errorResponse);
  });
  it('handles get admin profile', async () => {
    const profile = await getProfile({ commit });
    expect(profile).toEqual({
      roleName: 'superAdmin',
      email: 'test@example.com',
      firstName: 'test',
      lastName: 'example',
    });
  });
  it('handles get admin profile error', async () => {
    const profile = await getProfile({ commit });
    expect(profile).toEqual(errorResponse);
  });
});
