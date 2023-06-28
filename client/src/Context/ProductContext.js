import { createContext, useContext, useEffect, useState } from 'react';
import { getCategories, getProductsByCategory, getAllProducts, getProductById } from '../services/productService';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [productID, setProductID] = useState('');
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let productListData;
        if (category && category.length > 0) {
          productListData = await getProductsByCategory(category);
        } else {
          productListData = await getAllProducts();
          setCategory('');
        }
        setProductList(productListData);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [category]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        if (productID && productID.length > 0) {
          const productData = await getProductById(productID);
          setProduct(productData.data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
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

  return <ProductContext.Provider value={values}>{children}</ProductContext.Provider>;
};

export const useProduct = () => useContext(ProductContext);
