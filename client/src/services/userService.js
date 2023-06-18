// userService.js

import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Replace with your backend API URL

const userService = {
    getCustomerByID: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getCartItemsByUserId: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}/cart`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  addItemsToCartById: async (userId, productId) => {
    try {
      const response = await axios.post(`${API_URL}/user/${userId}/cart`, { productId });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteItemfromCart: async (userId, productId) => {
    try {
      const response = await axios.delete(`${API_URL}/user/${userId}/cart`, { data: { productId } });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getFavItemsByUserId: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}/favorites`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  addFavItems: async (userId, productId) => {
    try {
      const response = await axios.post(`${API_URL}/user/${userId}/favorites`, { productId });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deletefavItems: async (userId, productId) => {
    try {
      const response = await axios.delete(`${API_URL}/user/${userId}/favorites`, { data: { productId } });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default userService;
