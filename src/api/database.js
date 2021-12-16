import { instance } from '../config';

export function uploadData(formData) {
  return instance.post('dataset', formData);
}

export function getAllCountryData(params) {
  const {
    page = 1, ...rest
  } = params;
  const obj = {
    page, ...rest,
  };
  Object.keys(obj).forEach((k) => obj[k] === '' && delete obj[k]);
  return instance.get('dataset', {
    params: obj,
  });
}

export function updateData({ id, payload }) {
  return instance.put(`dataset/${id}`, payload);
}
