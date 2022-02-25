import {
  getAllCustomers, changeCustomerStatus, singleCustomerActivities, exportCustomers,
} from '@/api';
import errorHandler from '@/utils/error-handler';

export default {
  getAllCustomers: ({ commit }, body) => getAllCustomers(body)
    .then(({ data: { data } }) => {
      commit('SET_ALL_CUSTOMERS', data.customer);
      return data;
    })
    .catch((response) => errorHandler(response, true)),
  changeCustomerStatus: ({ dispatch }, body) => changeCustomerStatus(body)
    .then(({ data }) => {
      dispatch('getAllCustomers', {});
      const { message } = data;
      return message;
    })
    .catch((response) => errorHandler(response, true)),
  singleCustomerActivities: ({ commit }, body) => singleCustomerActivities(body)
    .then(({ data: { data } }) => {
      commit('SET_SINGLE_CUSTOMER_ACTIVITIES', data.customer);
      return data;
    })
    .catch((response) => errorHandler(response, true)),
  exportCustomers: ({ dispatch }, body) => exportCustomers(body)
    .then(({ data }) => {
      dispatch('getAllCustomers', {});
      return data;
    })
    .catch((response) => errorHandler(response, true)),
};
