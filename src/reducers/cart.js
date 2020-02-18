import {
  GET_CART,
  REMOVE_FROM_CART,
  ADD_TO_CART,
  CART_ERROR
} from "../actions/types";

const initialState = {
  items: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CART:
      return {
        ...state,
        items: payload,
        loading: false
      };
    case ADD_TO_CART:
      return {
        ...state,
        items: payload,
        loading: false
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: payload,
        loading: false
      };
    case CART_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
