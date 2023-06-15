import axios from "axios";

const API_URL = "http://localhost:8190/api/user";

// Get user details
export const getUserDetails = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      return response.data.message;
    } catch (error) {
      throw error.response.data.error;
    }
  };
  
  // Get user cart
  export const getUserCart = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}/cart`);
      return response.data.message;
    } catch (error) {
      throw error.response.data.error;
    }
  };
  
  // Add product to cart
  export const addProductToCart = async (userId, productId) => {
    try {
      const response = await axios.post(`${API_URL}/${userId}/cart`, { productId });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
  
  // Delete product from cart
  export const deleteProductFromCart = async (userId, productId) => {
    try {
      const response = await axios.delete(`${API_URL}/${userId}/cart`, { data: { productId } });
      return response.data.message;
    } catch (error) {
      throw error.response.data.error;
    }
  };
  
  // Get user favorites
  export const getUserFavorites = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}/favorites`);
      return response.data.message;
    } catch (error) {
      throw error.response.data.error;
    }
  };
  
  // Add product to favorites
  export const addFavoriteProduct = async (userId, productId) => {
    try {
      const response = await axios.post(`${API_URL}/${userId}/favorites`, { productId });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
  
  // Delete product from favorites
  export const deleteFavoriteProduct = async (userId, productId) => {
    try {
      const response = await axios.delete(`${API_URL}/${userId}/favorites`, { data: { productId } });
      return response.data.message;
    } catch (error) {
      throw error.response.data.error;
    }
  };
  
  // Get all users (for testing purpose)
  export const getAllUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data.message;
    } catch (error) {
      throw error.response.data.error;
    }
  };
  