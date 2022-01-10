import { instance } from '../config';

export function getAllAdmin({ page = 1, limit = 10 }) {
  return instance.get(`/admin?page=${page}&limit=${limit}`);
}

export function addAdmin({ admin }) {
  return instance.post('/admin', admin);
}

export function getOtherAdmin({ id }) {
  return instance.get(`/admin/${id}`);
}

export function editOtherAdmin({ admin: { id, ...admin } }) {
  return instance.put(`/admin/${id}`, admin);
}

export function deleteOtherAdmin({ id }) {
  return instance.delete(`/admin/${id}`);
}

export function exportAdmins() {
  return instance.get('/admin/export');
}
