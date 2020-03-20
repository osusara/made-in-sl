import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, ACCOUNT_DELETED, GET_BUYER_PROFILES, GET_SELLER_PROFILES } from "./types";

// get current profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/seller/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// get all buyer profiles
export const getBuyerProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get("/api/buyer/profile");

    dispatch({
      type: GET_BUYER_PROFILES,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
}

// get buyer profile by id
export const getBuyerProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/buyer/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
}

// get all admin profiles
export const getSellerProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get("/api/seller/profile");

    dispatch({
      type: GET_SELLER_PROFILES,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
}

// get admin profile by id
export const getSellerProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/seller/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
}

// create or update a profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("api/seller/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? "Profile updated" : "Profile created", "success"));

    if (!edit) {
      history.push("/profile");
    }
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// delete account
export const deleteAccount = () => async dispatch => {
  try {
    await axios.delete("/api/seller/profile");

    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: ACCOUNT_DELETED });

    dispatch(setAlert("Your account has been permanently deleted"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
}
