import { getAllCustomers, disableCustomer } from '@/api';
import errorHandler from '@/utils/error-handler';

export default {
  getAllCustomers: ({ commit }, body) => getAllCustomers(body)
    .then(({ data: { data } }) => {
      commit('SET_ALL_CUSTOMERS', data.customer);
      return data;
    })
    .catch((response) => errorHandler(response, true)),
  disableCustomer: ({ dispatch }, body) => disableCustomer(body)
    .then(({ data: { data } }) => {
      dispatch('getAllCustomers', {});
      return data;
    })
    .catch((response) => errorHandler(response, true)),
};
