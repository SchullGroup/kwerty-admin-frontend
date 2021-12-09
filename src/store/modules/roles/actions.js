import {
  getAllRoles,
} from '@/api';
import errorHandler from '@/utils/error-handler';

export default {
  fetchAll: ({ commit }, body) => getAllRoles(body)
    .then(async ({ data: { data } }) => {
      commit('SET_ROLES', data);
      return data;
    }).catch((response) => errorHandler(response, true)),
};
