import {  openLoginPopup, openPopup } from 'store/actions/commonAction';
import { 
  getUserEndpoint, 
  updateUserEndpoint, 
  searchUserClothesEndpoint, 
  createUserItemEndpoint, 
  updateUserItemEndpoint, 
  deleteUserItemEndpoint, 
  getUserItemsEndpoint, 
  getAllItemsEndpoint, 
  deleteItemEndpoint, 
  getItemEndpoint, 
  uploadItemImageEndpoint, 
  getUserClothesEndpoint, 
  updateItemEndpoint, 
  getItemImageEndpoint 
} from '../config/env';
import { useSelector } from 'react-redux';

export const handleTrigger = (isLoggedIn = true, dispatch,action ) => {
  if (isLoggedIn) {
    dispatch(action);
    dispatch(openPopup());
  } else {
    dispatch(openLoginPopup());
  }
};

export const getUser = async (username) => {
  try {
    const response = await axios.get(getUserEndpoint(username));
    if (response.status === 200 && response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const updateUser = async (userId, data) => {
  const response = await fetch(updateUserEndpoint(userId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const searchUserClothes = async (userId, searchParam) => {
  const response = await fetch(searchUserClothesEndpoint(userId, searchParam));
  return response.json();
};

export const createUserItem = async (userId, data,token) => {
  const response = await fetch(createUserItemEndpoint(userId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateUserItem = async (userId, itemId, data) => {
  const response = await fetch(updateUserItemEndpoint(userId, itemId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteUserItem = async (userId, itemId) => {
  const response = await fetch(deleteUserItemEndpoint(userId, itemId), {
    method: 'DELETE',
  });
  return response.json();
};

export const getUserItems = async (userId, size, page) => {
  const response = await fetch(getUserItemsEndpoint(userId, size, page));
  return response.json();
};

export const getAllItems = async (size, page) => {
  const response = await fetch(getAllItemsEndpoint(size, page));
  return response.json();
};

export const deleteItem = async (itemId, userId) => {
  const response = await fetch(deleteItemEndpoint(itemId, userId), {
    method: 'DELETE',
  });
  return response.json();
};

export const getItem = async (itemId) => {
  const response = await fetch(getItemEndpoint(itemId));
  return response.json();
};

export const uploadItemImage = async (itemId, formData) => {
  const response = await fetch(uploadItemImageEndpoint(itemId), {
    method: 'POST',
    body: formData,
  });
  return response.json();
};

export const getUserClothes = async (userId, itemName, size, page) => {
  const response = await fetch(getUserClothesEndpoint(userId, itemName, size, page));
  return response.json();
};

export const updateItem = async (itemId, userId, data) => {
  const response = await fetch(updateItemEndpoint(itemId, userId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getItemImage = async (itemId) => {
  const response = await fetch(getItemImageEndpoint(itemId));
  return response.json();
};