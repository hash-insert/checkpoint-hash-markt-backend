import axios from "axios";
const API_URL = "http://localhost:8190";
const SIGNUP_URL = `${API_URL}/api/auth/signup`;
const LOGIN_URL = `${API_URL}/api/auth/login`;
const LOGOUT_URL = `${API_URL}/api/auth/logout`;


const login = async (email, password) => {
  try {
    const response = await axios.post(LOGIN_URL, { email, password }, {withCredentials : true});
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const logout = async () => {
  try {
    await axios.get(LOGOUT_URL);
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const signup = async (name, email, password) => {
  try {
    const response = await axios.post(SIGNUP_URL, { name, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export { login, logout, signup };
