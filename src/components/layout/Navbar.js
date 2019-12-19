import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg" className="navbar-container">
      <Navbar.Brand style={{color: "#b63a46"}} href="/">Made In Sri Lanka</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Form inline className="form-group my-1 mx-3">
            <Form.Control size="sm" type="text" placeholder="Product Name" className="mr-sm-2 text-center search-input" />
            <Button variant="outline-secondary" size="sm" className="my-1 px-3 search-btn">Search</Button>
          </Form>
          <Nav.Link href="/login" className="text-center">Login</Nav.Link>
          <Nav.Link href="/register" className="text-center">Sign Up</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;