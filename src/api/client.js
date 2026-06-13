import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.swmlops.site',
  withCredentials: true,
});

export default client;
