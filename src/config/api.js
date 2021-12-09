import axios from 'axios';

import { APP_NAME } from './app';

const API_URL = process.env.VUE_APP_KWERTY_API_URL;
const API_VERSION = 1;

const getToken = () => {
  const store = JSON.parse(localStorage.getItem(APP_NAME));

  const apiToken = store && store.token;
  return apiToken ? `Bearer ${apiToken}` : '';
};

const instance = axios.create({
  baseURL: `${API_URL}/v${API_VERSION}`,
  crossdomain: true,
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: getToken(),
  },
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (window.location.pathname !== '/login') {
      if (error.response.status === 401) {
        await localStorage.clear();
        setTimeout(() => {
          window.location.replace('/login');
        }, 1000);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export { API_URL, API_VERSION, instance };
