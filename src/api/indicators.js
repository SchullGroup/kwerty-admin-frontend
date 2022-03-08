import { instance } from '../config';

export function getIndicators({
  page = 1, search = '', name, category,
}) {
  let url = `/indicator?search=${search}&page=${page}&limit=20`;
  if (name && category) {
    url = `/indicator?category=${category}&name=${name}&page=${page}&limit=20`;
  }
  return instance.get(url);
}

export function addIndicator({ indicator }) {
  return instance.post('/indicator', indicator);
}

export function deleteIndicator(body) {
  return instance.delete('/indicator', { data: { ...body } });
}

export function updateIndicator({ id, indicator }) {
  return instance.put(`/indicator/${id}`, indicator);
}

export function getIndicatorsList() {
  return instance.get('/indicator');
}

export function searchIndicators({ name }) {
  return instance.get(`/indicator?search=${name}`);
}

export const getIndicatorsInCategory = ({ category }) => instance.get(
  `/indicator/filter?category=${category}`,
);

export const searchIndicatorsInCategory = ({ name, category }) => {
  const query = new URLSearchParams();
  query.append('name', name);
  query.append('category', category);
  return instance.get(`/indicator?${query.toString()}`);
};
