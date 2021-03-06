import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Main from "./components/Pages/Main";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Profile from "./components/profile/Profile";
import CreateProfile from "./components/profile/CreateProfile";
import SellerProfiles from "./components/profiles/SellerProfiles";
import SellerProfileView from "./components/profiles/SellerProfileView";
import BuyerProfiles from "./components/profiles/BuyerProfiles";
import BuyerProfileView from "./components/profiles/BuyerProfileView";

import Footer from "./components/layout/Footer";
import PrivateRoute from "./components/routing/PrivateRoute";

// redux
import { Provider } from "react-redux";
import store from "./store";
import { loadAdmin } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

// check if a token is already in localStorage
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // life cycle Hook (similar to componentDidMount).
  // componentDidMount() is a life cycle method and it's work with classes. This is a function
  useEffect(() => {
    store.dispatch(loadAdmin());
  }, []); // with [], useEffect will run once when it mounted. unless it'll keep running when the state update

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          <Route exact path="/profiles" component={SellerProfiles} />
          <Route exact path="/profile/:id" component={SellerProfileView} />
          <Route exact path="/buyer/profiles" component={BuyerProfiles} />
          <Route exact path="/buyer/profile/:id" component={BuyerProfileView} />

          <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        </Switch>

        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
