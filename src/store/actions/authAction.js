import { LOGIN_REQUEST, LOGOUT_REQUEST, REGISTER_REQUEST } from "store/types/apiActionTypes";

export const login = (email, password) => {
  debugger;
  return {
    type: LOGIN_REQUEST,
    payload: { email, password },
  };
};

export const register = (data) => ({
  type: REGISTER_REQUEST,
  payload: data,
});

export const logout = () => ({
  type: LOGOUT_REQUEST,
});
