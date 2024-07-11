import { searchUserClothesEndpoint } from "config/env";


export const login = (email, password) => ({
  type: 'LOGIN',
  payload: { email, password },
});

export const register = (data) => ({
  type: 'REGISTER',
  payload: data,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const searchUserClothesRequest = (
  userId,
  searchParam,
  token,
  dispatch
) => {
  dispatch({
    type: API_REQUEST,
    payload: {
      url: searchUserClothesEndpoint(userId, searchParam),
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
    },
  });
};
export const validateTokenAndGetUser = async (token) => {
  return { username: "Alice" };
};