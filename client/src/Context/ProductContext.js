import {
  getAllProducts,
  getProductsByCategory,
  getProductsById,
} from "../services/productServices";
import { createContext, useContext, useEffect, useState } from "react";
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState("/products");
  const [productID, setProductID] = useState("");
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getCategories = async () => {
      try {
        let categoriesData = [
          "Electronics",
          "Jewelery",
          "Men's Clothing",
          "Women's Clothing",
        ];
        setCategories(categoriesData);
      } catch (error) {
        console.log("error in setting the catagories", error);
      }
    };
    getCategories();
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    const getProductData = async () => {
      try {
        if (category && category.length > 0) {
          let productsByCategory = await getProductsByCategory(category);
          setProduct(productsByCategory);
          setCategory("");
          setLoading(false);
        } else {
          let allProducts = await getAllProducts();
          setProduct(allProducts);
          setCategory("");
          setLoading(false);
        }
      } catch (error) {
        console.log("error in getting products", error);
      }
    };
    getProductData();
  }, [category]);

  useEffect(() => {
    setLoading(true);
    const getProductDetail = async () => {
      try {
        if (productID && productID.length > 0) {
          let productsById = await getProductsById(productID);
          setProduct(productsById);
          setProductID("");
        }
      } catch (error) {
        console.log("error in getting product details", error);
      }
      setLoading(false);
    };
    getProductDetail();
  }, [productID]);

  const values = {
    product,
    productList,
    productID,
    setProductID,
    categories,
    setCategory,
    loading,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
