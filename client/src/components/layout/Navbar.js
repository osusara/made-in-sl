import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { logout } from "../../actions/auth";

const NavBar = ({ auth: {isAdmin, isAuthenticated, loading}, logout}) => {
  
  const authLinks = (
    <Fragment>
      <Link to="/products" className="nav-link text-center">
        <i className="fas fa-store"></i>{" "}
        <span className="hide-sm">Products</span>
      </Link>
      <Link to="/cart" className="nav-link text-center">
        <i className="fas fa-shopping-cart"></i>{" "}
        <span className="hide-sm">Cart</span>
      </Link>
      <Link to="/profile" className="nav nav-link">
        <i className="fas fa-user"></i> <span className="hide-sm">Profile</span>
      </Link>
      <Nav.Link onClick={logout} href="/">
        <i className="fas fa-sign-out-alt"></i>{" "}
        <span className="hide-sm">Logout</span>
      </Nav.Link>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link to="/products" className="nav-link text-center">
        <i className="fas fa-store"></i>{" "}
        <span className="hide-sm">Products</span>
      </Link>
      <Link to="/login" className="nav-link text-center">
        <i className="fas fa-sign-in-alt"></i>{" "}
        <span className="hide-sm">Login</span>
      </Link>
      <Link to="/register" className="nav-link text-center">
        <i className="fas fa-user-plus"></i>{" "}
        <span className="hide-sm">Sign Up</span>
      </Link>
    </Fragment>
  );
  
  return (
    <Navbar bg="light" variant="light" expand="lg" className="navbar-container shadow-sm">
      <Navbar.Brand style={{color: "#b63a46"}} href="/">MADE IN SRI LANKA</Navbar.Brand>
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