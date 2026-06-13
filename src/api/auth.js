import axios from 'axios';

import useAuthStore from '@/store/authStore';

const client = axios.create({
  baseURL: 'https://api.swmlops.site',
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  failedQueue = [];
};

const AUTH_ROUTES = ['/api/auth/login', '/api/auth/refresh', '/api/auth/logout'];

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !AUTH_ROUTES.includes(originalRequest.url)
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => client(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await client.post('/api/auth/refresh');
        processQueue(null);
        return client(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        useAuthStore.getState().setLoggedIn(false);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export { client };

export const login = ({ username, password }) =>
  client.post('/api/auth/login', { username, password });

export const signup = ({ name, email, username, password }) =>
  client.post('/api/auth/signup', { name, email, username, password });

export const logout = () => client.post('/api/auth/logout');

export const refresh = () => client.post('/api/auth/refresh');
