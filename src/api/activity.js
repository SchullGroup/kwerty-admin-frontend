import { instance } from '../config';

export function getActivities({ page, adminToken }) {
  return instance.get(`activity-log?type=admin&page=${page}&limit=20`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
}
export function dummy() {}
