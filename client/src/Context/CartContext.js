import { useState, createContext, useContext, useEffect } from 'react'
import { addProductToCart, deleteProductFromCart, getUserCart } from "../services/userService"
import { useAuth } from "../Context/AuthContext";

const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartItems = await getUserCart(currentUser._id)
        console.log(cartItems);
        setItems(cartItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentUser]);

  const addToCart = async (data, findCartItem) => {
    try {
      if (!findCartItem) {
        const updatedItems = await addProductToCart(currentUser._id, data); 
        setItems(updatedItems);
      } else {
        const filtered = items.filter((item) => item.id !== findCartItem.id);
        setItems(filtered);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (item_id) => {
    try {
      const updatedItems = await deleteProductFromCart(currentUser._id, item_id); 
      setItems(updatedItems);
    } catch (error) {
      console.error(error);
    }
  };

  const values = {
    items,
    setItems,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};


const useCart = () => useContext(CartContext)

export { CartProvider, useCart }