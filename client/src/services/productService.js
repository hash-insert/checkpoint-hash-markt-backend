import axios from "axios";
const API = "http://localhost:8000";
const getProducts = `${API}/api/products`;
const getProductByID = `${API}/api/product`;

export const productData = async (category) => {
  try {
    const categoryData = await axios.get(`${getProducts}/${category}`);
    return categoryData;
  } catch (err) {
    console.log(err);
  }
};
export const getAllProducts = async () => {
  try {
    const data = await axios.get(`${getProducts}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getProductDataByID = async (id)=>{
    try{
        const productData = await axios.get(`${getProductByID}/${id}`);
        return productData
    }catch(err){
        console.log(err)
    }
}
export const getCategories = async ()=>{
    try{
        const categories = await axios.get(`${API}/api/categories`)
        return categories
    }catch(err){
        console.log(err)
    }
}
