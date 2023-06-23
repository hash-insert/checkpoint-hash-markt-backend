import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {getCategories, productData, getAllProducts, getProductDataByID } from "../services/productService";
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState("/products");
  const [productID, setProductID] = useState("");
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(async()=>{
    try {
      let allData = await getAllProducts();
      setProductList(allData.data);
      setCategory("");
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  },[])
  useEffect(() => {
    setLoading(true);
    const getCategory = async () => {
      let categories = await getCategories();
      console.log(categories.data);
      let categoriesData= categories.data.map((item) =>
          item.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())
        );
      setCategories(categoriesData);
    };
    getCategory();
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    const getProductData = async () => {
      if (category && category.length > 0) {
        try {
          let categoryWiseData = await productData(category);
          setProductList(categoryWiseData.data);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          let allData = await getAllProducts();
          setProductList(allData.data);
          setCategory("");
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getProductData();
  }, [category]);

  useEffect(() => {
    setLoading(true);
      const getProductDetail = async () => {
        let idData = await getProductDataByID(productID)
        setProduct(idData.data)
        setLoading(false)
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
