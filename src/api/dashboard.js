import { instance } from '../config';

export function getRecentAdminActivities({ id, duration }) {
  return instance.get(`/admin-dashboard/admin-activity?id=${id}&duration=${duration}&limit=7`);
}

export function getAnalytics({ duration }) {
  return instance.get(`/admin-dashboard/analytics?duration=${duration}`);
}

export function getActiveUsers({ duration }) {
  return instance.get(`/admin-dashboard/active-users?duration=${duration}`);
}
