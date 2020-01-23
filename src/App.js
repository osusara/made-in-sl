import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Buyer from "./components/Buyer";
import Admin from "./_admin/Admin";

import setAuthToken from "./utils/setAuthToken";

import './App.css';

// check if a token is already in localStorage
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Router>
      <Redirect from="/" to="/buyer" />
      <Route path="/buyer" component={Buyer} />
      <Route path="/seller" component={Admin} />
    </Router>
  );
}

export default App;
