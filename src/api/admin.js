import { instance } from '../config';

export function getAllAdmin({ token, page = 1, limit = 10 }) {
  return instance.get(`/admin?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function addAdmin({ token, admin }) {
  return instance.post('/admin', admin, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getOtherAdmin({ token, id }) {
  return instance.get(`/admin/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function editOtherAdmin({ token, admin: { id, ...admin } }) {
  return instance.put(`/admin/${id}`, admin, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function deleteOtherAdmin({ id, token }) {
  return instance.delete(`/admin/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
