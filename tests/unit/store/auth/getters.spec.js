import getters from '@/store/modules/auth/getters';

const { getUser, getToken, getProfile } = getters;

const state = {
  user: {
    id: 1,
    name: 'John Doe',
    email: 'test@test.com',
    isVerified: true,
  },
  profile: {
    id: 1,
    name: 'John Doe',
    email: 'test@test.com',
    isVerified: true,
  },
  token: 'my-test-token',
};

describe('Auth getters', () => {
  it('getUser', () => {
    expect(getUser(state)).toEqual(state.user);
  });

  it('getToken', () => {
    expect(getToken(state)).toEqual(state.token);
  });
  it('getProfile', () => {
    expect(getProfile(state)).toEqual(state.profile);
  });
});
