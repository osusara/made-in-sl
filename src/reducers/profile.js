import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_BUYER_PROFILES,
  GET_SELLER_PROFILES
} from "../actions/types";

const initialState = {
  profile: null,
  buyerprofiles: [],
  sellerprofiles: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_BUYER_PROFILES:
      return {
        ...state,
        buyerprofiles: payload,
        loading: false
      };
    case GET_SELLER_PROFILES:
      return {
        ...state,
        sellerprofiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    default:
      return state;
  }
}
