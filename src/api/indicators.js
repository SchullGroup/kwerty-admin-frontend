import { instance } from '../config';

export function getIndicators({ page = 1, search = '' }) {
  return instance.get(`/indicator?search=${search}&page=${page}&limit=20`);
}

export function addIndicator({ indicator }) {
  return instance.post('/indicator', indicator);
}

export function deleteIndicator({ body }) {
  return instance.delete('/indicator', body);
}
