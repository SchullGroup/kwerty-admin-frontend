import { instance } from '../config';

export function getActivities({ page }) {
  return instance.get(`activity-log?type=admin&page=${page}&limit=20`);
}
export function getUserActivities({ page }) {
  return instance.get(`activity-log?type=user&page=${page}&limit=20`);
}
