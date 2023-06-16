import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/auth';

export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, { name, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};