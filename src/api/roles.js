import { instance } from '../config';

export function getAllRoles({ token }) {
  return instance.get('/role', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// here to stop errors
export function getSomething() {
  return null;
}
