import axios from "axios";
import { setAlert } from "./alert";
import { GET_CART, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART, CART_ERROR } from "./types";

// get cart
export const getCart = () => async dispatch => {
  try {
    const res = await axios.get("/api/buyer/cart");

    dispatch({
      type: GET_CART,
      payload: res.data
    });

  } catch (error) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// add or update cart
export const addToCart = (productId, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(`/api/buyer/cart/${productId}`, formData, config);

    dispatch({
      type: ADD_TO_CART,
      payload: res.data
    });

    dispatch(setAlert("Added to Cart", "success"));

  } catch (error) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// delete from cart
export const removeFromCart = (productId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/buyer/cart/${productId}`);

    dispatch({
      type: REMOVE_FROM_CART,
      payload: res.data
    })

    dispatch(setAlert("Item removed", "warning"));
  } catch (error) {
    dispatch({
      type: CART_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
}