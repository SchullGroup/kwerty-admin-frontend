import { instance } from '../config';

export function getAllCustomers({ page = 1, nameOrEmail }) {
  const query = new URLSearchParams();
  if (nameOrEmail) {
    query.append('nameOrEmail', nameOrEmail);
  }
  return instance.get(`/customer?page=${page}&limit=20&${query.toString()}`);
}

export function changeCustomerStatus(user) {
  return instance.patch('/customer', user);
}

export function singleCustomerActivities({ id, duration = '', page }) {
  return instance.get(`/customer/?id=${id}&duration=${duration}&page=${page}&limit=20`);
}

// export function searchCustomer({ nameOrEmail }) {
//   return instance.get(`/customer?nameOrEmail=${nameOrEmail}`);
// }

export function exportCustomers(
  {
    title, fileType, startDate, endDate, id,
  },
) {
  const query = new URLSearchParams();
  if (id) {
    query.append('id', id);
  }
  return instance.get(
    // eslint-disable-next-line vue/max-len
    `/customer/export?startDate=${startDate}&endDate=${endDate}&file_type=${fileType}&title=${title}&${query.toString()}`,
  );
}
