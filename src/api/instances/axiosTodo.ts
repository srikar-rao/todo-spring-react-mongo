import axios from 'axios';

const axiosTodo = axios.create({
  baseURL: import.meta.env.VITE_TODO_SERVICE_URL || 'http://localhost:8080/todo-service',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export default axiosTodo;
