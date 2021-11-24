import { instance } from '../config';

export function login({ user }) {
  return instance.post('admin/auth/login', user);
}
export function forgotPassword({ user }) {
  return instance.post('admin/auth/forgot-password', user);
}
export function resetPassword({ data, token }) {
  return instance.patch('admin/auth/reset-password', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
