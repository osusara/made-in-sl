import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

// import Navbar from "./components/layout/Navbar";
// import Landing from "./components/layout/Landing";
// import Login from "./components/auth/Login";
// import Register from "./components/auth/Register";
// import Footer from "./components/layout/Footer";
import Buyer from "./components/Buyer";
import Admin from "./_admin/Admin";

// import { Provider } from 'react-redux';
// import store from "./store";
// import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import './App.css';

// check if a token is already in localStorage
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  // life cycle Hook (similar to componentDidMount).
  // componentDidMount() is a life cycle method and it's work with classes. This is a function
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []); // with [], useEffect will run once when it mounted. unless it'll keep running when the state update

  return (
    // <Provider store={store}>
    <Router>
        <Fragment>
          {/* <Navbar /> */}
          <Route exact path="/" component={Buyer} />
          <Route exact path="/seller" component={Admin} />
          {/* <section style={{ padding: "0", margin: "0" }} className="container-fluid">
            <Switch>
              
            </Switch>
          </section> */}
          {/* <Footer /> */}
        </Fragment>
    </Router>
    // </Provider>
  );
}

export default App;
