import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:7000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const register = async (userData) => {
  try {
    const res = await api.post('user/register', userData)
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message
  }
}

export const login = async (userData) => {
  try {
    const res = await api.post('/user/login', userData);
    return res;
  } catch (error) {
    throw error.response?.data || error.message
  }
}