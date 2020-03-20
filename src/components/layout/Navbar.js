import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { logout } from "../../actions/auth";

const NavBar = ({ auth: {isAuthenticated, loading}, logout}) => {
  
  const authLinks = (
    <Fragment>
      <Link to="/profiles" className="nav-link text-center text-light">Sellers</Link>
      <Link to="/buyer/profiles" className="nav-link text-center text-light">Buyers</Link>
      <Link to="/addproduct" className="nav-link text-center text-light">Add Products</Link>
      <Link to="/profile" className="nav nav-link">
        <i className="fas fa-admin"></i>{" "}
        <span className="hide-sm text-light">Profile</span>
      </Link>
      <Nav.Link onClick={logout} href="/seller">
        <i className="fas fa-sign-out-alt"></i>{" "}
        <span className="hide-sm text-light">Logout</span>
      </Nav.Link>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link to="/login" className="nav-link text-center text-light">
        Login as Admin
      </Link>
    </Fragment>
  );
  
  return (
    <Navbar expand="lg" className="navbar-container">
      <Navbar.Brand href="/" className="text-light">Made In Sri Lanka</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {!loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logout})(NavBar);