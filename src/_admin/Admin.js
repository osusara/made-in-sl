import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Profile from "./components/profile/Profile";
import CreateProfile from "./components/profile/CreateProfile";
import EditProfile from "./components/profile/EditProfile";
import SellerProfiles from "./components/profiles/SellerProfiles";
import SellerProfileView from "./components/profiles/SellerProfileView";
import BuyerProfiles from "./components/profiles/BuyerProfiles";
import BuyerProfileView from "./components/profiles/BuyerProfileView";
import Products from "./components/product/Products";
import Product from "./components/product/Product";
import Footer from "./components/layout/Footer";
import PrivateRoute from "./components/routing/PrivateRoute";

// redux
import { Provider } from "react-redux";
import store from "./store";
import { loadAdmin } from "./actions/auth";
import setAuthToken from "../utils/setAuthToken";

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

        <Route exact path="/seller/profiles" component={SellerProfiles} />
        <Route exact path="/seller/profile/:id" component={SellerProfileView} />
        <Route exact path="/seller/buyer/profiles" component={BuyerProfiles} />
        <Route exact path="/seller/buyer/profile/:id" component={BuyerProfileView} />
        <PrivateRoute exact path="/seller/profile" component={Profile} />
        <PrivateRoute exact path="/seller/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/seller/edit-profile" component={EditProfile} />

        <Route exact path="/seller/produts" component={Products} />
        <Route exact path="/seller/produts/:id" component={Product} />
      </Switch>
      <Route component={Footer} />
    </Provider>
  );
};

export default Admin;
