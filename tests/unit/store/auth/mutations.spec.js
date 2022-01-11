import mutations from '@/store/modules/auth/mutations';

const {
  SET_USER, SET_TOKEN, RESET, SET_ADMIN_PROFILE,
} = mutations;

let state = {
  user: {},
  token: '',
  profile: {},
};
describe('SET_USER', () => {
  it('adds a new user to the store', () => {
    const newUser = {
      firstName: 'test',
      lastName: 'user',
      email: 'test@example.com',
      role: 'super_admin',
    };
    SET_USER(state, newUser);
    expect(state.user).toBe(newUser);
  });
});
describe('SET_TOKEN', () => {
  it('adds a new token to the store', () => {
    const newToken = 'my-test-token';
    SET_TOKEN(state, newToken);
    expect(state.token).toBe(newToken);
  });
});

describe('RESET', () => {
  it('removes everything in the store', () => {
    state = {
      profile: {},
      user: {
        firstName: 'test',
        lastName: 'user',
        email: 'test@example.com',
        role: 'super_admin',
      },
      token: 'my-test-token',
    };
    RESET(state);
    expect(state).toEqual({ token: null, user: {}, profile: {} });
  });
});
describe('SET_ADMIN_PROFILE', () => {
  it('adds admin profile to store', () => {
    const profile = {
      firstName: 'test',
      lastName: 'user',
      email: 'test@example.com',
      role: 'super_admin',
    };
    SET_ADMIN_PROFILE(state, profile);
    expect(state.profile).toEqual(profile);
  });
});
