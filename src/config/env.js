export const BASE_URL = 'https://closetconnect-dev-73814f63526e.herokuapp.com/api/v1';

export const endpoints = {
  handler:'/api/handler',
  registerUser: `${BASE_URL}/auth/register`,
  loginUser: `${BASE_URL}/auth/login`,
  getUser: (userId) => `${BASE_URL}/user/${userId}`,
  updateUser: (userId) => `${BASE_URL}/user/update/${userId}`,
  searchUserClothes: (userId, searchParam) => `${BASE_URL}/clothingItems/search?userId=${userId}&${searchParam}`,
  createUserItem: (userId) => `${BASE_URL}/clothingItems/create/${userId}`,
  updateUserItem: (userId, itemId) => `${BASE_URL}/clothingItems/update/${userId}/${itemId}`,
  deleteUserItem: (userId, itemId) => `${BASE_URL}/clothingItems/${itemId}/user/${userId}`,
  getUserItems: (userId, size, page) => `${BASE_URL}/clothingItems/user/${userId}?size=${size}&page=${page}`,
  getAllItems: (size, page) => `${BASE_URL}/clothingItems/all?size=${size}&page=${page}`,
  deleteItem: (itemId, userId) => `${BASE_URL}/clothingItems/${itemId}/user/${userId}`,
  getItem: (itemId) => `${BASE_URL}/clothingItems/cloth/${itemId}`,
  uploadItemImage: (itemId) => `${BASE_URL}/clothingItems/${itemId}/cloth-image`,
  getUserClothes: (userId, itemName, size, page) => `${BASE_URL}/clothingItems/search?userId=${userId}&itemName=${itemName}&size=${size}&page=${page}`,
  updateItem: (itemId, userId) => `${BASE_URL}/clothingItems/update/${itemId}/${userId}`,
  getItemImage: (itemId) => `${BASE_URL}/clothingItems/${itemId}/cloth-image`,
  searchAllClothingItems: (itemName, size, page) => `${BASE_URL}/clothingItems/search/all?itemName=${itemName}&size=${size}&page=${page}`,
  requestTrade: `${BASE_URL}/trades/requestTrade`,
  getUserSentTrades: (userId, page) => `${BASE_URL}/trades/user/${userId}/sentTrades?page=${page}`,
  getUserReceivedTrades: (userId, page) => `${BASE_URL}/trades/user/${userId}/receivedTrades?page=${page}`,
  getTrade: (tradeId) => `${BASE_URL}/trades/getTrade/${tradeId}`,
  acceptOrDeclineTrade: (tradeId, userId) => `${BASE_URL}/trades/changeTradeStatus/trade/${tradeId}/user/${userId}`,
};

export const enums = {
  gender: ['MALE', 'FEMALE'],
  role: ['USER', 'ADMIN'],
  sizes: ['SMALL', 'MEDIUM', 'LARGE'],
  itemTypes: ['TOPS', 'BOTTOMS'],
};

export const handlerEndpoint = endpoints.handler;
export const registerUserEndpoint = endpoints.registerUser;
export const loginUserEndpoint = endpoints.loginUser;
export const getUserEndpoint = endpoints.getUser;
export const updateUserEndpoint = endpoints.updateUser;
export const searchUserClothesEndpoint = endpoints.searchUserClothes;
export const createUserItemEndpoint = endpoints.createUserItem;
export const updateUserItemEndpoint = endpoints.updateUserItem;
export const deleteUserItemEndpoint = endpoints.deleteUserItem;
export const getUserItemsEndpoint = endpoints.getUserItems;
export const getAllItemsEndpoint = endpoints.getAllItems;
export const deleteItemEndpoint = endpoints.deleteItem;
export const getItemEndpoint = endpoints.getItem;
export const uploadItemImageEndpoint = endpoints.uploadItemImage;
export const getUserClothesEndpoint = endpoints.getUserClothes;
export const updateItemEndpoint = endpoints.updateItem;
export const getItemImageEndpoint = endpoints.getItemImage;
export const searchAllClothingItemsEndpoint = endpoints.searchAllClothingItems;
export const requestTradeEndpoint = endpoints.requestTrade;
export const getUserSentTradesEndpoint = endpoints.getUserSentTrades;
export const getUserReceivedTradesEndpoint = endpoints.getUserReceivedTrades;
export const getTradeEndpoint = endpoints.getTrade;
export const acceptOrDeclineTradeEndpoint = endpoints.acceptOrDeclineTrade;