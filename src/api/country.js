import { instance } from '../config';

export const addCountryDashboard = (body) => instance.post('/country-dashboard', body);

export const getAllDashboards = ({ page = 1 }) => instance.get(`/country-dashboard?page=${page}`);

export const getDashboard = ({ id }) => instance.get(`country-dashboard/${id}`);

export const deleteDashboard = ({ id }) => instance.delete(`country-dashboard/${id}`);

// eslint-disable-next-line vue/max-len
export const getCountryAnalytics = ({ duration }) => instance.get(`/country-dashboard/analytics?duration=${duration}`);
