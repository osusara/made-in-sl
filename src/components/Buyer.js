import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Admin from "../_admin/Admin";
import Navbar from "./layout/Navbar";
import Landing from "./layout/Landing";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Alert from "./layout/Alert";
import Profile from "./profile/Profile";
import CreateProfile from "./profile/CreateProfile";
import EditProfile from "./profile/EditProfile";
import AddAddress from "./profile/AddAddress";
import Footer from "./layout/Footer";
import PrivateRoute from "./routing/PrivateRoute";

// redux
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";
import setAuthToken from "../utils/setAuthToken";

// check if a token is already in localStorage
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const User = () => {
  // life cycle Hook (similar to componentDidMount).
  // componentDidMount() is a life cycle method and it's work with classes. This is a function
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); // with [], useEffect will run once when it mounted. unless it'll keep running when the state update

  return (
    <Provider store={store}>
      
        {/* <Fragment> */}
          {/* <Navbar /> */}
          <Route component={Navbar} />
          {/* <Route exact path="/" component={Landing} />
          <section style={{ padding: "0", margin: "0" }} className="container-fluid"> */}
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/seller" component={Admin} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-address" component={AddAddress} />
            </Switch>
          {/* </section>
          <Footer /> */}
          <Footer/>
        {/* </Fragment> */}
      
    </Provider>
  );
};

export default User;


// import React, { Fragment } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";

// import Buyer from "./components/Buyer";
// import Admin from "./_admin/Admin";

// import { Provider } from "react-redux";
// import store from "./store";
// import setAuthToken from "./utils/setAuthToken";

// import "./App.css";

// // check if a token is already in localStorage
// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

// const App = () => {
//   return (
//     <Provider store={store}>
//       <Router>
//         <Fragment>
//           <Route exact path="/" component={Buyer} />
//           <Route exact path="/seller" component={Admin} />
//         </Fragment>
//       </Router>
//     </Provider>
//   );
// };

// export default App;