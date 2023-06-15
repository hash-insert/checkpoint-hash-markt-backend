import { createContext, useContext, useEffect, useState } from 'react';
import { getCategories, getProductsByCategory, getAllProducts, getProductById } from '../services/productService';
const ProductContext = createContext()
export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([])
  const [categories, setCategories] = useState()
  const [category, setCategory] = useState("/products")
  const [productID, setProductID] = useState("")
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const categoriesData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.log(error);
      }
    };
    categoriesData()
    setLoading(false)
  }, [])
  useEffect(() => {
    setLoading(true)
    const getProductData = async (category) => {
      try {
        if (category && category.length > 0) {
          const response  = await getProductsByCategory(category);
          setProductList(response);
          setLoading(false);
        } else {
          const response = await getAllProducts();
          setProductList(response);
          setCategory('');
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getProductData()
  }, [category])
  useEffect(() => {
    setLoading(true)
    const getProductDetail = async () => {
        try {
          if (productID && productID.length > 0) {
            const response = await getProductById(productID);
            setProduct(response);
            setLoading(false);
          }
         }
        catch (error) {
            console.log(error);
             }
};
    getProductDetail()
  }, [productID])
  const values = {
    product,
    productList,
    productID,
    setProductID,
    categories,
    setCategory,
    loading,
  }
  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  )
}
export const useProduct = () => useContext(ProductContext)