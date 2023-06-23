import axios from 'axios';
let API = 'https://hashmarketbackend.onrender.com'

export const getCart = async(id)=>{
    let response = await axios.get(`${API}/api/user/${id}/usercart`)
    return response.data
}
export const addCart =async (body,id)=>{
    let response = await axios.post(`${API}/api/user/${id}/add/cart`,body)
    return response.data
}
export const removeItem = async(item,id)=>{
    let response = await axios.post(`${API}/api/user/${id}/removeItem`,item)
    return response.data
}
export const removeCart = async(id,itemId)=>{
    let response = await axios.post(`${API}/api/user/${id}/deleteCart`,{itemId})
    return response.data
}
export const getFavourite = async(id)=>{
    let response = await axios.get(`${API}/api/user/${id}/favourites`)
    return response.data
}
export const addFavourite = async(body,id)=>{
    let response = await axios.post(`${API}/api/user/${id}/favourites`,body)
    return response.data
}
export const removeFavourite = async(item,id)=>{
    let response = await axios.post(`${API}/api/user/${id}/removeFav`,item)
    return response.data
}