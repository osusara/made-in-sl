import { combineReducers } from "redux";

import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import product from "./product";
import cart from "./cart";

export default combineReducers({
  alert,
  auth,
  profile,
  product,
  cart
});