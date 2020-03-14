import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT,
  PRODUCT_ERROR
} from "./types";

// get products
export const getProducts = () => async dispatch => {
  try {
    const res = await axios.get("/api/products");

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
}

// delete product
export const deleteProduct = id => async dispatch => {
  try {
    await axios.delete(`/api/products/${id}`);

    dispatch({
      type: DELETE_PRODUCT,
      payload: id
    });

    dispatch(
      setAlert("Product Removed", "success")
    );
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// add post
export const addProduct = formData => async dispatch => {
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/products', formData, config);

    dispatch({
      type: ADD_PRODUCT,
      payload: res.data
    });

    dispatch(
      setAlert("Product Added", "success")
    );
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// get product
export const getProduct = id => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`);

    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};