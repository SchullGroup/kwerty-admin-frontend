import { instance } from '../config';

export function getActivities({
  page = 1,
  type = null,
  search = '',
  duration = '',
}) {
  let url = `activity-log?type=${type}&page=${page}&limit=20`;
  if (search) {
    url = `activity-log?type=${type}&page=${page}&limit=20&search=${search}`;
  } else if (duration) {
    return instance.get(`activity-log?type=${type}&page=${page}&limit=20&duration=${duration}`);
  }
  return instance.get(url);
}

export function exportActivities({
  startdate,
  enddate,
  fileType,
  type,
  title,
}) {
  return instance.get(
    // eslint-disable-next-line vue/max-len
    `/activity-log/export?start_date=${startdate}&end_date=${enddate}&file_type=${fileType}&title=${title}&type=${type}`,
  );
}
