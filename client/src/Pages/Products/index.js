import React, {useEffect} from "react";
import { useProduct } from "../../Context/ProductContext";
import styles from "./styles.module.css";
import Spinner from "../../Components/Spinner";
import { useParams } from "react-router-dom";
import { useCart } from '../../Context/CartContext'
import { useFavorite } from '../../Context/FavoriteContext'
import Card from "../../Components/Card";

const Products = () => {
  const {addToCart, items} = useCart()
  const {addToFavorite, favoriteItems} = useFavorite()
  const { productList, loading, setProductID, setCategory } = useProduct();
  
  const {category_id} = useParams()

  useEffect(() => {
    setCategory(category_id)
  }, [category_id])

  return (
    <div className={styles.cardGroup}>
      {!loading ? (
        productList.data?.map((item, index) => {
          const findCartItem = items.find((cart_item) => cart_item._id === item._id)
          const findFavoriteItem = favoriteItems.find((favorite_item) => favorite_item._id === item._id)
          return (
            <Card key={`product-${item._id}`} item={item} setProductID={setProductID} findCartItem={findCartItem} findFavoriteItem={findFavoriteItem} addToCart={addToCart} addToFavorite={addToFavorite} />
          );
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Products;
