import { getAllCountryData, uploadData } from '@/api';
import errorHandler from '@/utils/error-handler';

export default {
  fetchDatabase: ({ commit }, params) => getAllCountryData(params)
    .then(({ data: { data } }) => {
      commit('SET_DATABASE', data.dataset);
      const paginationData = data;
      delete paginationData.dataset;
      return paginationData;
    })
    .catch((response) => errorHandler(response, true)),
  uploadCSV: (context, body) => uploadData(body)
    .then(async ({ data: { message } }) => message)
    .catch((response) => errorHandler(response, true)),
};
