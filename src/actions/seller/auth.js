import axios from "axios";
import { setAlert } from "../alert";
import {
  SELLER_REGISTER_SUCCESS,
  SELLER_REGISTER_FAIL,
  SELLER_USER_LOADED,
  AUTH_ERROR,
  SELLER_LOGIN_SUCCESS,
  SELLER_LOGIN_FAIL
} from "../types";
import setAuthToken from "../../utils/setAuthToken";

// load user
export const loadUser = () => async dispatch =>{
  // check if a token is in localStorage
  if(localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/seller/auth');

    dispatch({
      type:SELLER_USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// register user
export const register = ({ username, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ username, email, password });

  try {
    const res = await axios.post('/api/seller/users', body, config);

    dispatch({
      type: SELLER_REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if(errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }

    dispatch({
      type: SELLER_REGISTER_FAIL
    });
  }
};

// login user
export const login = (email, password) => async dispatch => {
  
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/seller/auth', body, config);

    dispatch({
      type: SELLER_LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if(errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: SELLER_LOGIN_FAIL
    });
  }
};
