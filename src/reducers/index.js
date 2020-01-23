import { combineReducers } from "redux";

import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
// import adminAuth from "../_admin/reducers/auth";
// import adminProfile from "../_admin/reducers/profile";

export default combineReducers({
  alert,
  auth,
  profile
});