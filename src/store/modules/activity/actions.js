import { getActivities, exportActivities } from '@/api';
import errorHandler from '@/utils/error-handler';

export default {
  getActivities: ({ commit }, body) => getActivities(body)
    .then(({ data: { data } }) => {
      if (body.type === 'admin') {
        commit('SET_ACTIVITIES', data.activityLog);
      } else {
        commit('SET_USER_ACTIVITIES', data.activityLog);
      }
      return data;
    })
    .catch((response) => errorHandler(response, true)),
  exportActivities: ({ dispatch }, body) => exportActivities(body)
    .then(({ data: { data } }) => {
      dispatch('getActivities', {});
      return data;
    })
    .catch((response) => errorHandler(response, true)),
};
