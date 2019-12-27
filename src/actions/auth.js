import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// load user
export const loadUser = () => async dispatch =>{
  // check if a token is in localStorage
  if(localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/buyer/auth');

    dispatch({
      type:USER_LOADED,
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
    const res = await axios.post('/api/buyer/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if(errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
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
    const res = await axios.post('/api/buyer/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if(errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
}
