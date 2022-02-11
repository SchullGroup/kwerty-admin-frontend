import { getRecentAdminActivities, getAnalytics } from '@/api';
import errorHandler from '@/utils/error-handler';

export default {
  getRecentAdminActivities: ({ commit }, body) => getRecentAdminActivities(body)
    .then(({ data }) => {
      commit('SET_RECENT_ACTIVITIES', data.data);
      const { message } = data;
      return message;
    })
    .catch((response) => errorHandler(response, true)),
  getAnalytics: ({ commit }, body) => getAnalytics(body)
    .then(({ data }) => {
      commit('SET_ANALYTICS', data.data);
      return data;
    })
    .catch((response) => errorHandler(response, true)),
};
