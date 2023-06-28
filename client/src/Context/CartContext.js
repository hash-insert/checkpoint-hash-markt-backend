import { useState, createContext, useContext, useEffect } from 'react'
import { useAuth } from "./AuthContext";
import { addProductToCart, deleteProductFromCart, getUserCart } from '../services/userService';

const CartContext = createContext()



const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const { loggedIn } = useAuth();
  

  const getUserID = () => {
    let userData = JSON.parse(localStorage.getItem("currentUser"));
    return userData._id;
  };

  useEffect(async () => {
    if (loggedIn) {
      let userId = getUserID();
      let cartItems = await getUserCart(userId);
      setItems(cartItems);
    } else {
      setItems([]);
    }
  }, [loggedIn]);

  const addToCart = async (data, findCartItem) => {
    if (!findCartItem) {
      let userId = getUserID();
      let addTo = await addProductToCart(userId, data);
      let cartItems = await getUserCart(userId);
      setItems(cartItems);
    } else {
      let userId = getUserID();
      await deleteProductFromCart(userId, data._id);
      let cartItems = await getUserCart(userId);
      setItems(cartItems);
    }
  };
  
  const removeFromCart = async (item_id) => {
    try {
      let id = getUserID();
      await deleteProductFromCart(id, item_id);
      let cartItems = await getUserCart(id);
      setItems(cartItems);
    } catch (err) {
      console.log(err);
    }
  };
  

  const values = {
    items,
    setItems,
    addToCart,
    removeFromCart,
  }

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }