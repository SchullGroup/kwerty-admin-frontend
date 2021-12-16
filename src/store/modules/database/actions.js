import { getAllCountryData, uploadData } from '@/api';
import errorHandler from '@/utils/error-handler';

export default {
  fetchDatabase: ({ commit }, body) => getAllCountryData(body)
    .then(({ data: { data } }) => {
      commit('SET_DATABASE', data.data);
      return data;
    })
    .catch((response) => errorHandler(response, true)),
  uploadCSV: (context, body) => uploadData(body)
    .then(async ({ data: { message } }) => message)
    .catch((response) => errorHandler(response, true)),
};
