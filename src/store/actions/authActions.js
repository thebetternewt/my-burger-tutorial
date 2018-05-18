import axios from 'axios';
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAILED,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH
} from './types';

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    token,
    userId
  };
};

const authFailed = error => {
  return {
    type: AUTH_FAILED,
    error
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expDate');
  localStorage.removeItem('localId');
  return {
    type: AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expTime => dispatch => {
  // Log user out after given expTime period (ms)
  setTimeout(() => {
    dispatch(logout());
  }, expTime);
};

export const authenticate = (email, password, isSignup) => dispatch => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true
  };

  // URL for Firebase Signup
  let url =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDXJgtwtjfidARRI0UeZLeRankK1ANdWDI';
  if (!isSignup) {
    // URL for Firebase Login
    url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDXJgtwtjfidARRI0UeZLeRankK1ANdWDI';
  }

  axios
    .post(url, authData)
    .then(res => {
      const expDate = new Date(
        new Date().getTime() + res.data.expiresIn * 1000 // convert expiresIn to ms
      );
      // Store token data in LocalStorage
      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('expDate', expDate);
      localStorage.setItem('userId', res.data.localId);

      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkAuthTimeout(res.data.expiresIn * 1000)); // convert expiresIn to ms
    })
    .catch(err => {
      dispatch(authFailed(err.response.data.error));
    });
};

export const setAuthRedirectPath = (path = '/') => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path
  };
};

export const checkAuthState = () => dispatch => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    // Pull expDate from LS and convert from String to Date
    const expDate = new Date(localStorage.getItem('expDate'));
    if (expDate > new Date()) {
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess(token, userId));
      dispatch(checkAuthTimeout(expDate.getTime() - new Date().getTime()));
    } else {
      dispatch(logout());
    }
  }
};
