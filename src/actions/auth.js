import { LOGOUT } from "./types";

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
