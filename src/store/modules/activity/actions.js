import { getActivities } from '@/api';
import errorHandler from '@/utils/error-handler';

export default {
  getActivities: ({ commit }, body) => getActivities(body)
    .then(({ data: { data } }) => {
      commit('SET_ACTIVITIES', data.activityLog);
      console.log(data);
      return data;
    })
    .catch((response) => errorHandler(response, true)),
};
