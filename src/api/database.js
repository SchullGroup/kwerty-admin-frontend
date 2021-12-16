import { instance } from '../config';

export function uploadData(formData) {
  return instance.post('dataset', formData);
}

export function getAllCountryData() {
  return instance.get('dataset');
}

export function updateData({ id, payload }) {
  return instance.put(`dataset/${id}`, payload);
}
