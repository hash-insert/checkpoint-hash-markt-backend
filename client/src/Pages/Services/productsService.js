import axios from 'axios';
const API_BASE_URL = 'http://localhost:8000/api/product';
// Fetch all categories
const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data.map(item => item.replace(/^(.)|\s+(.)/g, c => c.toUpperCase()));
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
// Fetch all products
const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
// Fetch products by category
const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/category/${category}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
// Fetch product by ID
const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
export { getCategories, getAllProducts, getProductsByCategory, getProductById };