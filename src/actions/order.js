import axios from "axios";
import { setAlert } from "./alert";
import { GET_ORDER, ADD_ORDER, ORDER_ERROR } from "./types";

// get order
export const getOrder = () => async dispatch => {
  try {
    const res = await axios.get("/api/buyer/order");

    dispatch({
      type: GET_ORDER,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// add  order
export const addOrder = (formData) => async dispatch => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };

    const res = await axios.post(`/api/buyer/order`, formData, config);

    dispatch({
      type: ADD_ORDER,
      payload: res.data
    });

    dispatch(setAlert("Order Placed", "success"));
  } catch (error) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// delete from order
// export const removeFromCart = productId => async dispatch => {
//   try {
//     const res = await axios.delete(`/api/buyer/order/${productId}`);

//     dispatch({
//       type: REMOVE_FROM_CART,
//       payload: res.data
//     });

//     dispatch(setAlert("Item removed", "warning"));
//   } catch (error) {
//     dispatch({
//       type: CART_ERROR,
//       payload: { msg: error.response.statusText, status: error.response.status }
//     });
//   }
// };
