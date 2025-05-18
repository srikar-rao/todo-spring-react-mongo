import axios from 'axios';
import { getToken } from '../../auth/keycloakService';

const axiosTodo = axios.create({
  baseURL: import.meta.env.VITE_TODO_SERVICE_URL || 'http://localhost:8080/todo-service',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

axiosTodo.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosTodo;
