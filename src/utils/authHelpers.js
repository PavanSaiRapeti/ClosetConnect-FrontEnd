import { getUserEndpoint } from "config/env";
import { api } from "../pages/api/handler";



export async function checkAuth(token,userId,headers={}) {
    if (!token || !userId) {
      return  { isRedirect:true, user: null};
    }
    const requestData = { url: getUserEndpoint(userId), payload: {} };
    const response = await api.get(requestData.url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        ...headers
      }
    });
  
    if (!response.data) {
      return  { isRedirect:true, user: null};
    }
  
    return { isRedirect:false, user: response.data};
}

