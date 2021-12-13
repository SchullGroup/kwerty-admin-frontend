import { getActivities, getUserActivities } from '@/api';
import errorHandler from '@/utils/error-handler';

export default {
  getActivities: ({ commit }, body) => getActivities(body)
    .then(({ data: { data } }) => {
      commit('SET_ACTIVITIES', data.activityLog);
      return data;
    })
    .catch((response) => errorHandler(response, true)),
  getUserActivities: ({ commit }, body) => getUserActivities(body)
    .then(({ data: { data } }) => {
      commit('SET_USER_ACTIVITIES', data.activityLog);
      return data;
    })
    .catch((response) => errorHandler(response, true)),
};
