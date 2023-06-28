import { useState, createContext, useContext, useEffect } from 'react'
import { useAuth } from './AuthContext';
import { addFavoriteProduct, deleteFavoriteProduct, getUserFavorites } from '../services/userService';
const FavoriteContext = createContext()


const FavoriteProvider = ({ children }) => {
  const { loggedIn } = useAuth();
  const [favoriteItems, setFavoriteItems] = useState([]);


  const getUserID = () => {
    let userData = JSON.parse(localStorage.getItem("currentUser"));
    return userData._id;
  };


  useEffect(async () => {
    if (loggedIn) {
      let userId = getUserID();
      let favoriteItems = await getUserFavorites(userId);
      setFavoriteItems(favoriteItems);
    } else {
      setFavoriteItems([]);
    }
  }, []);



  const addToFavorite = async (data, findFavoriteItem) => {
    if (!findFavoriteItem) {
      let userId = getUserID();
      let addToFavourites = await addFavoriteProduct(userId, data);
      let fav_Items = await getUserFavorites(userId)
      setFavoriteItems(fav_Items);
    } else {
      let userId = getUserID();
      const toBeRemoved = await deleteFavoriteProduct(userId, data._id);
      let fav_Items = await getUserFavorites(userId)
      setFavoriteItems(fav_Items);
    }
  };

  const values = {
    favoriteItems,
    addToFavorite,
  }

  return <FavoriteContext.Provider value={values}>{children}</FavoriteContext.Provider>

}

const useFavorite = () => useContext(FavoriteContext)

export { FavoriteProvider, useFavorite }