import { combineReducers } from "redux";

import alert from "./alert";
import auth from "./auth";
import adminAlert from "../_admin/reducers/adminAlert";
import adminAuth from "../_admin/reducers/adminAuth";

export default combineReducers({
  alert,
  auth
});