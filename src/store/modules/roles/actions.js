import {
  getAllRoles,
  getAllRolesDetails,
  addRole,
  editRole,
  deleteRole,
} from '@/api';
import errorHandler from '@/utils/error-handler';
import scrollToTop from '@/utils/scrollToTop';

export default {
  fetchAll: ({ commit }, body) => getAllRoles(body)
    .then(async ({ data: { data } }) => {
      commit('SET_ROLES', data);
      return data;
    }).catch((response) => errorHandler(response, true)),

  fetchDetails: ({ commit }, body) => getAllRolesDetails(body)
    .then(async ({ data: { data: { roles } } }) => {
      commit('SET_ROLES_DETAILS', roles);
      return roles;
    }).catch((response) => errorHandler(response, true)),

  addRole: ({ dispatch }, body) => addRole(body)
    .then(async ({ data: { message } }) => {
      dispatch('fetchAll', {});
      dispatch('fetchDetails', {}).then(() => scrollToTop());
      return message;
    })
    .catch((response) => errorHandler(response, true)),

  editRole: ({ dispatch }, body) => editRole(body)
    .then(async ({ data: { message } }) => {
      dispatch('fetchAll', {});
      dispatch('fetchDetails', {}).then(() => scrollToTop());
      return message;
    })
    .catch((response) => errorHandler(response, true)),

  deleteRole: ({ dispatch }, body) => deleteRole(body)
    .then(async ({ data: { message } }) => {
      dispatch('fetchAll', {});
      dispatch('fetchDetails', {});
      return message;
    })
    .catch((response) => errorHandler(response, true)),
};
