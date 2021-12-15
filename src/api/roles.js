import { instance } from '../config';

export function getAllRoles() {
  return instance.get('/role');
}

export function getAllRolesDetails({ page = 1 }) {
  return instance.get(`/role?page=${page}`);
}

export function addRole({ role }) {
  return instance.post('/role', role);
}

export function editRole({ id, role }) {
  return instance.put(`/role/${id}`, role);
}

export function deleteRole({ id }) {
  return instance.delete(`/role/${id}`);
}
