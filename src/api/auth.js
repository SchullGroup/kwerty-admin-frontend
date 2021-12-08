import { instance } from '../config';

export function login({ user }) {
  return instance.post('auth/admin/login', user);
}

export function forgotPassword({ user }) {
  return instance.post('auth/admin/forgot-password', user);
}

export function resetPassword({ token }) {
  return instance.post('auth/admin/reset-password', {}, {
    headers: {
      Authorization: `${token}`,
    },
  });
}

export function getProfile({ id, token }) {
  return instance.get(`/admin/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
