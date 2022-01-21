import { instance } from '../config';

export function getAllCustomers() {
  return instance.get('./customer');
}

export function dummy() {}
