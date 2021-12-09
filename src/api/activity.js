import { instance } from '../config';

export function getActivities({ adminToken }) {
  return instance.get('activity-log?type=admin', {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
}
export function dummy() {}
