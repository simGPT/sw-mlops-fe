import client from './client';

export const login = ({ username, password }) =>
  client.post('/api/auth/login', { username, password });

export const signup = ({ name, email, username, password }) =>
  client.post('/api/auth/signup', { name, email, username, password });

export const logout = () => client.post('/api/auth/logout');
