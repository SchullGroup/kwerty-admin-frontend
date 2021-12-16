import { addIndicator, getIndicators, deleteIndicator } from '@/api';
import errorHandler from '@/utils/error-handler';

export default {
  addIndicator: ({ dispatch }, indicator) => addIndicator(indicator)
    .then(({ data }) => {
      // const page = body.page;
      // const search = body.search;
      dispatch('getIndicators', {});
      const { message } = data;
      return message;
    })
    .catch((response) => errorHandler(response)),
  getIndicators: ({ commit }, body) => getIndicators(body)
    .then(({ data: { data } }) => {
      commit('SET_INDICATORS', data.indicator);
      return data;
    })
    .catch((response) => errorHandler(response, true)),
  deleteIndicator: ({ dispatch }, body) => deleteIndicator(body)
    .then(({ data }) => {
      dispatch('getIndicators');
      const { message } = data;
      return message;
    })
    .catch((response) => errorHandler(response, true)),
};
