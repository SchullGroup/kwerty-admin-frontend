import { instance } from '../config';

export function getAllCustomers() {
  return instance.get('/customer');
}

export function changeCustomerStatus(user) {
  return instance.patch('/customer', user);
}

export function singleCustomerActivities(nameOrEmail) {
  return instance.get(`/customer?nameOrEmail=${nameOrEmail}`);
}
