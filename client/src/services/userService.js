import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/user';

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};