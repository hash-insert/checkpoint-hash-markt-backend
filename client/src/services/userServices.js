import axios from "axios";

API_URL = "http://localhost:8000/api/user";

const getUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log("error in getting the user details", error);
  }
};

const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.log("error in getting the user details", error);
  }
};
