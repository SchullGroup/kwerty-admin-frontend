import {
  addIndicator, getIndicators, deleteIndicator, updateIndicator,
  getIndicatorsList, searchIndicators, searchIndicatorsInCategory, getIndicatorsInCategory,
} from '@/api';
import errorHandler from '@/utils/error-handler';

export default {
  addIndicator: ({ dispatch }, indicator) => addIndicator(indicator)
    .then(({ data }) => {
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
      dispatch('getIndicators', {});
      const { message } = data;
      return message;
    })
    .catch((response) => errorHandler(response, true)),
  updateIndicator: ({ dispatch }, body) => updateIndicator(body)
    .then(({ data }) => {
      dispatch('getIndicators', {});
      const { message } = data;
      return message;
    })
    .catch((response) => errorHandler(response, true)),
  getInitialIndicators: ({ commit }) => getIndicatorsList()
    .then(({ data: { data } }) => {
      commit('ADD_INDICATORS', data.indicator);
      commit('ADD_CATEGORIES', data.indicator);

      return data;
    })
    .catch((response) => errorHandler(response)),
  fetchIndicatorsWith: ({ commit }, body) => {
    const { category, name } = body;
    let service = searchIndicators;
    if (name && category) {
      service = searchIndicatorsInCategory;
    } else if (category) {
      service = getIndicatorsInCategory;
    }

    return service(body)
      .then(({ data: { data } }) => {
        commit('ADD_INDICATORS', data.indicator || data);
        commit('ADD_CATEGORIES', data.indicator || data);

        return data;
      })
      .catch((response) => errorHandler(response));
  },
};
