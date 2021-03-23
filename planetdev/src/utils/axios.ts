import axios from 'axios';

export const TOKEN_KEY = 'PLANETDEV_TOKEN';

const client = axios.create({
    validateStatus: (status) => (status >= 200 && status < 300) || status === 400,
  });
  
  client.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);
  
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  
    return config;
  });
  
  export default client;