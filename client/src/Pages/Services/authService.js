import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw new Error(`Error while signing up: ${error.response.data}`);
  }
};

export const signin = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signin`, {
        email,
        password,
      });   
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(`Error while signing in: ${error.response.data}`);
      } else {
        throw new Error('Error while signing in. Please try again.');
      }
    }
  };

export const logout = async () => {
  try {
    await axios.get(`${API_BASE_URL}/logout`);
  } catch (error) {
    throw new Error(`Error while logging out: ${error.response.data}`);
  }
};
