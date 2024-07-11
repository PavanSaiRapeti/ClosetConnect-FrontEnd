import { searchUserClothesEndpoint } from "config/env";

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