export const BASE_URL = 'https://closetconnect-dev-73814f63526e.herokuapp.com/api/v1' ;

export const endpoints = {
  registerUser: `${BASE_URL}/auth/register`,
  loginUser: `${BASE_URL}/auth/login`,
  updateUser: (userId) => `${BASE_URL}/user/update/${userId}`,
  searchUserClothes: (userId, searchParam) => `${BASE_URL}/clothingItems/search?userId=${userId}&${searchParam}`,
};

export const enums = {
  gender: ['MALE', 'FEMALE'],
  role: ['USER', 'ADMIN'],
  sizes: ['SMALL', 'MEDIUM', 'LARGE'],
};

export const registerUserEndpoint = endpoints.registerUser;
export const loginUserEndpoint = endpoints.loginUser;
export const updateUserEndpoint = endpoints.updateUser;
export const searchUserClothesEndpoint = endpoints.searchUserClothes;



