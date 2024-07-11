

import { loginUserEndpoint, registerUserEndpoint } from '../../../config/env';
import { API_REQUEST } from '../../../store/types/apiActionTypes';


export const registerUser = async (userData, dispatch) => {
  try {
    dispatch({ type: API_REQUEST, payload: { url: registerUserEndpoint , method: 'post', data: userData } });
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const loginUser = async (email, password, dispatch) => {
  try {
    dispatch({ type: API_REQUEST, payload: { url: loginUserEndpoint , method: 'post', data: { email, password } } });
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};