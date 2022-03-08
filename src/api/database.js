import { instance } from '../config';
import cleanEmpty from '../utils/cleanEmpty';

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
  const cleanPayload = cleanEmpty(payload);
  return instance.put(`dataset/${id}`, cleanPayload);
}
export function getSingleData({ id }) {
  return instance.get(`dataset/${id}`);
}

export function updateDataStatus(payload) {
  return instance.put('dataset', payload);
}
