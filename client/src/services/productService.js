import axios from 'axios';

const API_URL = 'http://localhost:8190';

const getCategories = async () => {
    const categoriesData = ["Electronics" , "Jewelery" , `Men's Clothing` , `Women's Clothing`]
    return categoriesData;
};

const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/api/products/${category}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/products`);
    console.log(response.data);
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
