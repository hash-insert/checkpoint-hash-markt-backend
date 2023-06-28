import axios from "axios";

const API_URL = "http://localhost:8190/api/user";


export const getUserCart = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}/cart`);
      return response.data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  };


export const addProductToCart = async (userId, productId) => {
    try {
      const response = await axios.post(`${API_URL}/${userId}/cart`, { data: productId });
      return response.data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  export const deleteProductFromCart = async (userId, productId) => {
    try {
      const response = await axios.delete(`${API_URL}/${userId}/cart`, { data: { productId } });
      return response.data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  };


  export const getUserFavorites = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}/favorites`);
      return response.data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  export const addFavoriteProduct = async (userId, data) => {
    try {
      const response = await axios.post(`${API_URL}/${userId}/favorites`, { data });
      return response.data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  export const deleteFavoriteProduct = async (userId, productId) => {
    try {
      const response = await axios.delete(`${API_URL}/${userId}/favorites`, { data: { productId } });
      return response.data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  export const getUserDetails = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  