import { instance } from '../config';

export function getAllRoles() {
  return instance.get('/role');
}

// here to stop errors
export function getSomething() {
  return null;
}
