import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login_Buyer from "./components/auth/buyer/Login";
import Register_Buyer from "./components/auth/buyer/Register";
import Login_Seller from "./components/auth/seller/Login";
import Register_Seller from "./components/auth/seller/Register";
import Footer from "./components/layout/Footer";

import { Provider } from 'react-redux';
import store from "./store";
import { loadBuyer } from "./actions/buyer/auth";
import { loadSeller } from "./actions/seller/auth";
import setAuthToken from "./utils/setAuthToken";

import './App.css';

// check if a token is already in localStorage
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  // life cycle Hook (similar to componentDidMount).
  // componentDidMount() is a life cycle method and it's work with classes. This is a function
  useEffect(() => {
    store.dispatch(loadBuyer());
  }, []); // with [], useEffect will run once when it mounted. unless it'll keep running when the state update

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section style={{ padding: "0", margin: "0", height: "94%" }} className="container-fluid">
            <Switch>
              <Route exact path="/buyer/register" component={Register_Buyer} />
              <Route exact path="/buyer/login" component={Login_Buyer} />
              <Route exact path="/seller/register" component={Register_Seller} />
              <Route exact path="/seller/login" component={Login_Seller} />
            </Switch>
          </section>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
