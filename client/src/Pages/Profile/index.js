import React from 'react'
import { useAuth } from "../../Context/AuthContext";
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import { useCart } from '../../Context/CartContext';
import { useFavorite } from '../../Context/FavoriteContext';
const Profile = () => {

    const { currentUser } = useAuth();
    const { items } = useCart();
    const { favorites } = useFavorite();
    const initials = currentUser.name ? currentUser.name.charAt(0) : '';
    const favoritesCount = favorites ? favorites.length : 0;
    const itemsCount = items ? items.length : 0;
    return (
        <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center mt-10 border border-yellow-500 border-solid w-300 mb-20 pt-10 pb-10 pl-10 pr-10">
            <Avatar
                name={initials}
                size="128"
                round
                className="mb-4"
                style={{ fontSize: '48px' }}
                
            />
            <h1 className="text-2xl font-bold mb-2">{currentUser.name}</h1>
            <p className="text-gray-500 mb-4">{currentUser.email}</p>
            <div className="flex justify-between w-64">
                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-bold">Favorites</h2>
                    <p className="text-gray-500">{favoritesCount}</p>
                    <Link to="/favorites" className="text-blue-500 hover:underline">
                        Go to Favorites
                    </Link>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-bold">Cart Items</h2>
                    <p className="text-gray-500">{itemsCount}</p>
                    <Link to="/cart" className="text-blue-500 hover:underline">
                        Go to Cart
                    </Link>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Profile
