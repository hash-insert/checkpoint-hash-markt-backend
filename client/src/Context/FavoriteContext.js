import { useState, createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  getFavourite,
  addFavourite,
  removeFavourite,
} from "../services/userService";
const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const { loggedIn } = useAuth();
  const getUserID = () => {
    let userData = JSON.parse(localStorage.getItem("user"));
    return userData._id;
  };
  useEffect(async () => {
    if (loggedIn) {
      let userId = getUserID();
      let favoriteItems = await getFavourite(userId);
      setFavoriteItems(favoriteItems);
    } else {
      setFavoriteItems([]);
    }
  }, [loggedIn]);

  const addToFavorite = async (data, findFavoriteItem) => {
    if (!findFavoriteItem) {
      let userId = getUserID();
      let addToFavourites = await addFavourite(data, userId);
      console.log(addToFavourites);
      setFavoriteItems(addToFavourites);
    } else {
      let userId = getUserID();
      const toBeRemoved = await removeFavourite(data, userId);
      setFavoriteItems(toBeRemoved);
    }
  };

  const values = {
    favoriteItems,
    addToFavorite,
  };

  return (
    <FavoriteContext.Provider value={values}>
      {children}
    </FavoriteContext.Provider>
  );
};

const useFavorite = () => useContext(FavoriteContext);

export { FavoriteProvider, useFavorite };
