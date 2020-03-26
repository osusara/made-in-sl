import React from "react";
import { ListGroup, Nav, Tab, Row, Col } from "react-bootstrap";
import { Route, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import Spinner from "../layout/Spinner";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Users from "./Users";
import UserProfile from "./UserProfile";
import BuyerProfiles from "../profiles/BuyerProfiles";

const Main = ({ auth: {isAuthenticated, isAdmin, loading}}) => {

  // redirect if not logged in in
  if(!(isAuthenticated && isAdmin)) {
    return <Redirect to='/login' />
  }

  return (
    <Tab.Container defaultActiveKey="dashboard">
      <Row>
        <Col sm={2} className="sidebar-container py-2 px-2">
          <Nav variant="pills" className="flex-column">
            <Nav.Item className="my-1">
              <Nav.Link eventKey="dashboard" className="sidebar-text">Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item className="my-1">
              <Nav.Link eventKey="products" className="sidebar-text">Products</Nav.Link>
            </Nav.Item>
            <Nav.Item className="my-1">
              <Nav.Link eventKey="users" className="sidebar-text">Users</Nav.Link>
            </Nav.Item>
            <Nav.Item className="my-1">
              <Nav.Link eventKey="profile" className="sidebar-text">Profile</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10} className="dashboard-background py-4 px-2">
          <Route exact path="/buyer/profiles" component={BuyerProfiles} />
        {
          loading ? <Spinner /> : <Tab.Content>
            <Tab.Pane eventKey="dashboard">
              <Dashboard />
            </Tab.Pane>
            <Tab.Pane eventKey="products">
              <Products />
            </Tab.Pane>
            <Tab.Pane eventKey="users">
              <Users />
            </Tab.Pane>
            <Tab.Pane eventKey="profile">
              <UserProfile />
            </Tab.Pane>
          </Tab.Content>
        }
        </Col>
      </Row>
    </Tab.Container>
  );
};

Main.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Main);
