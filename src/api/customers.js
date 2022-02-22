import { instance } from '../config';

export function getAllCustomers({ page = 1, search = '' }) {
  return instance.get(`/customer?search=${search}&page=${page}&limit=20`);
}

export function changeCustomerStatus(user) {
  return instance.patch('/customer', user);
}

export function singleCustomerActivities(nameOrEmail) {
  return instance.get(`/customer?nameOrEmail=${nameOrEmail}`);
}

export function exportCustomers(
  {
    title, fileType, startDate, endDate,
  },
) {
  return instance.get(
    // eslint-disable-next-line vue/max-len
    `/customer/export?startDate=${startDate}&endDate=${endDate}&file_type=${fileType}&title=${title}`,
  );
}
