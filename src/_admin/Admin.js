import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Footer from "./components/layout/Footer";

import { Provider } from 'react-redux';
import { loadAdmin } from "./actions/auth";
import setAuthToken from "../utils/setAuthToken";
import store from "../store";

import './index.css';

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
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/seller" component={Landing} />
          <section style={{ padding: "0", margin: "0", height: "94%" }} className="container-fluid">
            <Switch>
              <Route exact path="/seller/register" component={Register} />
              <Route exact path="/seller/login" component={Login} />
            </Switch>
          </section>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default Admin;
