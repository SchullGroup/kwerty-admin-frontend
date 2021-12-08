import {
  login, forgotPassword, resetPassword, getProfile,
} from '@/api';
import errorHandler from '@/utils/error-handler';

export default {
  login: ({ commit }, body) => login(body)
    .then(async ({ data: { data } }) => {
      commit('SET_TOKEN', data.token);
      commit('SET_USER', data);
      return data;
    }).catch((response) => errorHandler(response, true)),

  forgotPassword: (context, body) => forgotPassword(body)
    .then(({ data }) => {
      const { message } = data;
      return message;
    }).catch((response) => errorHandler(response)),

  resetPassword: (context, body) => resetPassword(body)
    .then(({ data }) => {
      const { message } = data;
      console.log(message);
      return message;
    }).catch((response) => errorHandler(response)),

  getProfile: ({ commit }, body) => getProfile(body)
    .then(({ data: { data } }) => {
      commit('SET_ADMIN_PROFILE', data);
      return data;
    })
    .catch((response) => errorHandler(response)),
};
