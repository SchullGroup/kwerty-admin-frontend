import {
  getAllAdmin,
  addAdmin,
  editOtherAdmin,
  deleteOtherAdmin,
} from '@/api';
import errorHandler from '@/utils/error-handler';
import scrollToTop from '@/utils/scrollToTop';

export default {
  fetchAll: ({ commit }, body) => getAllAdmin(body)
    .then(async ({ data: { data } }) => {
      const { admin, ...pagination } = data;
      commit('SET_ADMIN', admin);
      commit('SET_ADMIN_PAGINATION', pagination);
      return data;
    }).catch((response) => errorHandler(response, true)),

  addAdmin: ({ dispatch }, body) => addAdmin(body)
    .then(async ({ data: { message } }) => {
      dispatch('fetchAll', { ...body }).then(() => scrollToTop());
      return message;
    })
    .catch((response) => errorHandler(response, true)),

  editOtherAdmin: ({ dispatch }, body) => editOtherAdmin(body)
    .then(async ({ data: { message } }) => {
      dispatch('fetchAll', { ...body }).then(() => scrollToTop());
      return message;
    })
    .catch((response) => errorHandler(response, true)),

  deleteOtherAdmin: ({ dispatch }, body) => deleteOtherAdmin(body)
    .then(async ({ data: { message } }) => {
      dispatch('fetchAll', { ...body });
      return message;
    })
    .catch((response) => errorHandler(response, true)),
};
