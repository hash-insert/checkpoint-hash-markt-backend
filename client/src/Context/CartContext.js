import { useState, createContext, useContext, useEffect } from "react";
import {
  getCart,
  addCart,
  removeCart,
  removeItem,
} from "../services/userService";
import { useAuth } from "./AuthContext";
const CartContext = createContext();



const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const { loggedIn } = useAuth();

  const getUserID = () => {
    let userData = JSON.parse(localStorage.getItem("user"));
    return userData._id;
  };
  console.log(loggedIn);
 
  useEffect(async () => {
    if (loggedIn) {
      let userId = getUserID();
      let cartItems = await getCart(userId);
      setItems(cartItems);
    } else {
      setItems([]);
    }
  }, [loggedIn]);

  const addToCart = async (data, findCartItem) => {
    if (!findCartItem) {
      let userId = getUserID();
      let addTo = await addCart(data, userId);
      console.log(addTo);
      setItems(addTo);
    } else {
      let userId = getUserID();
      const toBeRemoved = await removeItem(data, userId);
      setItems(toBeRemoved);
    }
  };

  const removeFromCart = async (item_id) => {
    try {
      let id = getUserID();
      const remove = await removeCart(id, item_id);
      console.log(remove);
      setItems(remove);
    } catch (err) {
      console.log(err);
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

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
