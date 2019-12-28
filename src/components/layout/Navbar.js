import React, { Fragment } from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { logout } from "../../actions/buyer/auth";

const NavBar = ({ auth: {isAuthenticated, loading}, logout}) => {
  
  const authLinks = (
    <Nav.Link onClick={logout} href="#!">
      <i className="fas fa-sign-out-alt"></i>
      <span className="hide-sm">Logout</span>
    </Nav.Link>
  );

  const guestLinks = (
    <Fragment>
      <Nav.Link href="/buyer/login" className="text-center">Login</Nav.Link>
      <Nav.Link href="/buyer/register" className="text-center">Sign Up</Nav.Link>
    </Fragment>
  );
  
  return (
    <Navbar bg="light" variant="light" expand="lg" className="navbar-container shadow-sm">
      <Navbar.Brand style={{color: "#b63a46"}} href="/">Made In Sri Lanka</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Form inline className="form-group my-1 mx-3">
            <Form.Control size="sm" type="text" placeholder="Product Name" className="mr-sm-2 text-center search-input" />
            <Button variant="outline-secondary" size="sm" className="my-1 px-3 search-btn">Search</Button>
          </Form>
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