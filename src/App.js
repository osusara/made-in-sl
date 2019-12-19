import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import './App.css';

const App = () => {
  return (
    <Router>
      <Fragment>
        <section style={{ padding: "0", margin: "0", height: "94%"}} className="container-fluid">
        <Navbar />
        <Route exact path="/" component={Landing} />
        
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
