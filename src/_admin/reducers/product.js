import {
  GET_PRODUCTS,
  UPDATE_LIKES,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  GET_PRODUCT,
  PRODUCT_ERROR
} from "../actions/types";

const initialState = {
  products: [],
  product: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [payload, ...state.products],
        loading: false
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product._id !== payload),
        loading: false
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        products: state.products.map(product =>
          product._id === payload.id
            ? { ...product, likes: payload.likes }
            : product
        ),
        loading: false
      };
    default:
      return state;
  }
}
