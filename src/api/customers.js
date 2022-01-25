import { instance } from '../config';

export function getAllCustomers() {
  return instance.get('./customer');
}

export function disableCustomer(user) {
  return instance.patch('./customer', user);
}
