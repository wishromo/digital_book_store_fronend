import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // for cookies
});

export default axiosInstance;
