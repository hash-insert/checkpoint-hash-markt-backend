import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/categories`);
    return response.data.map(item => item.replace(/^(.)|\s+(.)/g, c => c.toUpperCase()));
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/products/category/${category}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export { getCategories, getProductsByCategory, getAllProducts, getProductById };
