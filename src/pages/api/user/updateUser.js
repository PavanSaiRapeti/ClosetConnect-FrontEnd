import { api } from "../handler";


export const updateUser = async (userId, userData, token) => {
    try {
      const response = await api.put(`/users/${userId}`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };