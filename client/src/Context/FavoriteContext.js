import { useState, createContext, useContext, useEffect } from 'react';
import {getUserFavorites,addFavoriteProduct} from "../services/userService";
import {useAuth} from "../Context/AuthContext";

const FavoriteContext = createContext()

const FavoriteProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  
  const {currentUser} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoriteItems = await getUserFavorites(currentUser._id); 
        setFavoriteItems(favoriteItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentUser]);

  const addToFavorite = async (data, findFavoriteItem) => {
    try {
      if (!findFavoriteItem) {
        const updatedItems = await addFavoriteProduct(currentUser._id, data); 
      } else {
        const filtered = favoriteItems.filter((item) => item.id !== findFavoriteItem.id);
        setFavoriteItems(filtered);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const values = {
    favoriteItems,
    addToFavorite,
  };

  return <FavoriteContext.Provider value={values}>{children}</FavoriteContext.Provider>;
};


const useFavorite = () => useContext(FavoriteContext)

export { FavoriteProvider, useFavorite }