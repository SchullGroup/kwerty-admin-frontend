import { instance } from '../config';

export function getActivities({ page, type }) {
  return instance.get(`activity-log?type=${type}&page=${page}&limit=20`);
}
export function dummy() {}
