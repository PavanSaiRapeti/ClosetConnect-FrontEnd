// import axios from "axios";
// import { BASE_URL, endpoints } from "../../../env";

// export const updateUser = async (userId, userData, token) => {
//     try {
//       const response = await axios.put(endpoints.updateUser(userId), userData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response.data.message);
//     }
//   };