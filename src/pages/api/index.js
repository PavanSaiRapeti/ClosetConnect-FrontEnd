
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://closetconnect-dev-73814f63526e.herokuapp.com/api/v1',
});

const updateProfile = async (token, data) => {
  try {
    const response = await api.put(`/user/update/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const searchClothingItems = async (token, params) => {
  try {
    const response = await api.get(`/clothingItems/search`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { updateProfile, searchClothingItems };