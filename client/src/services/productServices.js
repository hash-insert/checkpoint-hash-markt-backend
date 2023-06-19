import axios from "axios";

const API_URL = "http://localhost:8000/api/products";

const getAllProducts = async () => {
  try {
    const allProducts = await axios.get(`${API_URL}/`);
    return allProducts.data;
  } catch (error) {
    console.log("error in product service 1", error);
  }
};

const getProductsByCategory = async (category) => {
  try {
    const allProducts = await axios.get(`${API_URL}/${category}`);
    return allProducts.data;
  } catch (error) {
    console.log("error in product service 2", error);
  }
};

const getProductsById = async (id) => {
  try {
    const allProducts = await axios.get(`${API_URL}/${id}`);
    return allProducts.data;
  } catch (error) {
    console.log("error in product service 3", error);
  }
};

export { getAllProducts, getProductsByCategory, getProductsById };
