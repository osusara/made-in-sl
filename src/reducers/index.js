import { combineReducers } from "redux";

import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import product from "./product";

export default combineReducers({
  alert,
  auth,
  profile,
  product
});