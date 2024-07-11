import { getUserEndpoint, loginUserEndpoint, registerUserEndpoint } from 'config/env';
import { api } from '..';

export const registerUser = async (userData) => {
  try {
    const response = await api.post(registerUserEndpoint, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const loginUser = async (email, password) => {
  debugger;
  try {
    const response = await api.post(loginUserEndpoint, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const validateTokenAndGetUser = async (token) => {
  try {
    const response = await api.get(getUserEndpoint, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error validating token and getting user: ' + error.message);
  }
};