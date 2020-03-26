import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { logout } from "../../actions/auth";

const NavBar = ({ auth: {isAuthenticated, loading}, logout}) => {
  
  const authLinks = (
    <Fragment>
      <Nav.Link onClick={logout} href="/">
        <i className="fas fa-sign-out-alt text-light"></i>{" "}
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
      <Navbar.Brand href="/" className="text-light">MADE IN SRI LANKA</Navbar.Brand>
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