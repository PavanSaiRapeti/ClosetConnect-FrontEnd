import { openLoginPopup, openPopup } from 'store/actions/commonAction';
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
  getItemImageEndpoint, 
  searchAllClothingItemsByTypeEndpoint,
  searchAllClothingItemsByGenderEndpoint,
  requestTradeEndpoint,
  markNotificationAsReadEndpoint,
  getUserNotificationsEndpoint,
  getUserSentTradesEndpoint,
  getUserReceivedTradesEndpoint,
  getTradeEndpoint,
  acceptOrDeclineTradeEndpoint,
  getAllItemsLatestEndpoint
} from '../config/env';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { debounce } from 'lodash';

export const handleTrigger = (isLoggedIn = true, dispatch,action ) => {
  if (isLoggedIn) {
    dispatch(action);
    dispatch(openPopup());
  } else {
    dispatch(openLoginPopup());
  }
};

export const getUser = async (id,token) => {
  try {
    const response = await axios.get(getUserEndpoint(id), {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.status === 200 && response) {
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
  const { token } = parseCookies();
  const response = await fetch(getUserItemsEndpoint(userId, size, page), {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getAllItems = async (size, page) => {
  const response = await fetch(getAllItemsEndpoint(size, page));
  return response.json();
};

export const getAllItemsLatest = async (size, page) => {
  const response = await fetch(getAllItemsLatestEndpoint(size, page));
  return response.json();
};

export const deleteItem = async (itemId, userId, token) => {
  const response = await fetch(deleteItemEndpoint(itemId, userId), {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getItem = async (itemId) => {
  const response = await fetch(getItemEndpoint(itemId));
  return response.json();
};
export const getItemByType = async (itemName, size, page) => {
  const response = await fetch(searchAllClothingItemsByTypeEndpoint(itemName, size, page));
  return response.json();
};
export const getItemByGender = async (itemName, size, page) => {
  const response = await fetch(searchAllClothingItemsByGenderEndpoint(itemName, size, page));
  return response.json();
};

export const uploadItemImage = async (itemId, formData, token) => {
  const response = await fetch(uploadItemImageEndpoint(itemId), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  return response.json();
};

export const getUserClothes = async (userId, itemName, size, page) => {
  const response = await fetch(getUserClothesEndpoint(userId, itemName, size, page));
  return response.json();
};

export const updateItem = async (itemId, userId, data) => {
  try {
    const response = await fetch(updateItemEndpoint(itemId, userId), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error('Failed to update item:', error);
    throw error;
  }
};

export const getItemImage = async (itemId, token) => {
  const response = await fetch(getItemImageEndpoint(itemId));
  const arrayBuffer = await response.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
  const imageUrl = URL.createObjectURL(blob);
  return imageUrl;
};


export const requestTrade = async ({ userId, userItemId, guestId, guestItemId, message, date, location, token }) => {
  try {
    const tradeData = {
      "tradeInitiatorId": userId,
      "itemRequestedId": guestItemId,
      "initiatorItemId": userItemId,
      "userToTradeWithId": guestId,
      "exchangeDate": date,
      "exchangeLocation": location,
      "message": message,
    }
    const response = await fetch(requestTradeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(tradeData),
    });
    return response;
  } catch (error) {
    console.error('Error requesting trade:', error);
    throw error;
  }
};

export const getUserNotifications = async (userId) => {
  const {token}=parseCookies();
  try {
    const response = await fetch(getUserNotificationsEndpoint(userId), {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if(response.status===200){
      return response.json();
    }
    return null;
  } catch (error) {
    console.error('Error getting user notifications:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId) => {
  const {token} = parseCookies();
  try {
    const response = await fetch(markNotificationAsReadEndpoint(notificationId), {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

export const getUserSentTrades = async (userId, page = 0) => {
  const {token}=parseCookies()
  try {
    const response = await fetch(getUserSentTradesEndpoint(userId, page),{
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error('Error getting user sent trades:', error);
    throw error;
  }
};

export const getUserReceivedTrades = async (userId, page = 0) => {
  const {token}=parseCookies()
  try {
    const response = await fetch(getUserReceivedTradesEndpoint(userId, page),{
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error('Error getting user received trades:', error);
    throw error;
  }
};

export const getTrade = async (tradeId,token) => {
  try {
    const response = await fetch(getTradeEndpoint(tradeId), {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error('Error getting trade:', error);
    throw error;
  }
};

export const acceptOrDeclineTrade = async (tradeId, userId, status, reason) => {
  const { token } = parseCookies();
  try {
    const response = await fetch(acceptOrDeclineTradeEndpoint(tradeId, userId), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: status,
        reason: reason
      }),
    });
    return response.json();
  } catch (error) {
    console.error('Error accepting or declining trade:', error);
    throw error;
  }
};