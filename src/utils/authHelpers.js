import { getUserEndpoint } from "config/env";
import { destroyCookie } from "nookies";
import { setToken, setUserId } from "store/actions/userAction";
import { VALIDATE_TOKEN_SUCCESS } from "store/types/apiActionTypes";

export async function checkAuth(token, userId, headers = {}) {
  if (!token || !userId) {
    return { isRedirect: true, user: null };
  }
  try {
    const response = await fetch(getUserEndpoint(userId), {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log('response==>', response);
    const userData = await response.json();

    return { isRedirect: false, user: userData };

  } catch (error) {
    console.error('Error fetching user data:', error);
    return { isRedirect: true, user: null };
  }

}

export const validateTokenAndFetchUser = async (store, token, userId, res) => {
  let userData = null;
  if (token) {
    const { user } = await checkAuth(token, userId);
    console.log('user==>', user, token, userId);
    if (user) {
      store.dispatch({
        type: VALIDATE_TOKEN_SUCCESS,
        payload: { user: userData, isLoggedIn: true }
      });
      store.dispatch(setUserId(userId));
      store.dispatch(setToken(token));
    }
    else {
      destroyCookie({ res }, 'token');
      destroyCookie({ res }, 'userId');
      store.dispatch(setUserId(null));
      store.dispatch(setToken(null));
    }
    return user;

  }
  else {
      destroyCookie({ res }, 'token');
      destroyCookie({ res }, 'userId');
      store.dispatch(setUserId(null));
      store.dispatch(setToken(null));
    }

    return userData;
  
  };