import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

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
      <Route path="/seller" component={Admin} />
      <Route path="/" component={Buyer} />
    </Router>

    // <Router>
    //   <Fragment>
    //     <Route exact path="/" component={Buyer} />
    //     <Route exact path="/seller" component={Admin} />
    //   </Fragment>
    // </Router>
  );
}

export default App;
