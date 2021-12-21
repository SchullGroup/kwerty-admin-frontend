import { instance } from '../config';

export function getActivities({
  page,
  type,
  search,
  duration,
}) {
  let url = `activity-log?type=${type}&page=${page}&limit=20`;
  if (search) {
    url = `activity-log?type=${type}&page=${page}&limit=20&search=${search}`;
  } else if (duration) {
    return instance.get(`activity-log?type=${type}&page=${page}&limit=20&duration=${duration}`);
  }
  return instance.get(url);
}

export function dummy() {}
