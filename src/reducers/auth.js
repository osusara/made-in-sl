import {
  USER_LOADED,
  SELLER_USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SELLER_REGISTER_SUCCESS,
  SELLER_REGISTER_FAIL,
  AUTH_ERROR,
  SELLER_LOGIN_SUCCESS,
  SELLER_LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "../actions/types";

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isSeller: false,
  loading: true,
  user: null
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isSeller: false,
        loading: false,
        user: payload
      };
    case SELLER_USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isSeller: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isSeller: false,
        loading: false
      };
    case SELLER_REGISTER_SUCCESS:
    case SELLER_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isSeller: true,
        loading: false
      };
    case REGISTER_FAIL:
    case SELLER_REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case SELLER_LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isSeller: false,
        loading: false
      };
    default:
      return state;
  }
};
