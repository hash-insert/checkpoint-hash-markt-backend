import axios from "axios";

const API_URL = "http://localhost:8000";

const signup = async (firstName, lastName, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const signin = async (email, password) => {
  console.log(email, password);
  try {
    const response = await axios.post(`${API_URL}/api/auth/signin`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log("error in login:", error);
  }
};

const logout = async () => {
  try {
    await axios.get(`${API_URL}/api/auth/logout`);
  } catch (error) {
    console.log("error in logging out:", error);
  }
};

export { signup, signin, logout };
