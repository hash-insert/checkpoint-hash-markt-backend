// productService.js

import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Replace with your backend API URL

const productService = {
    getProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getProdById: async (productId) => {
    try {
      const response = await axios.get(`${API_URL}/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getProdByCatogory: async (category) => {
    try {
      const response = await axios.get(`${API_URL}/products/${category}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default productService;
