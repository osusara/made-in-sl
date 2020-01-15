import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Register from "./components/auth/Register";
import Profile from "./components/profile/Profile";
import CreateProfile from "./components/profile/CreateProfile";
import EditProfile from "./components/profile/EditProfile";
import Footer from "./components/layout/Footer";
import PrivateRoute from "./components/routing/PrivateRoute";

import { Provider } from "react-redux";
import { loadAdmin } from "./actions/auth";
import setAuthToken from "../utils/setAuthToken";
import store from "../store";

import "./index.css";

// check if a token is already in localStorage
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const Admin = () => {
  // life cycle Hook (similar to componentDidMount).
  // componentDidMount() is a life cycle method and it's work with classes. This is a function
  useEffect(() => {
    store.dispatch(loadAdmin());
  }, []); // with [], useEffect will run once when it mounted. unless it'll keep running when the state update

  return (
    <Provider store={store}>
      <Route component={Navbar} />
      <Alert />
      <Switch>
        <Route exact path="/seller" component={Landing} />
        <Route exact path="/seller/register" component={Register} />
        <Route exact path="/seller/login" component={Login} />
        <PrivateRoute exact path="/seller/profile" component={Profile} />
        <PrivateRoute exact path="/seller/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/seller/edit-profile" component={EditProfile} />
      </Switch>
      <Route component={Footer} />
    </Provider>
  );
};

export default Admin;
