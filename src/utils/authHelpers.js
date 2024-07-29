import { getUserEndpoint } from "config/env";
import { api } from "pages/api/handler";



export async function checkAuth(token,userId,headers={}) {
    if (!token || !userId) {
      return  { isRedirect:true, user: null};
    }
    try {
      const response = await fetch(getUserEndpoint(userId), {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const userData = await response.json();
  
      return { isRedirect:false, user: userData};
      
    } catch (error) {
      console.error('Error fetching user data:', error);
      return  { isRedirect:true, user: null};
    }
 
}

