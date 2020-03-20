import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import BuyerProfiles from "../profiles/BuyerProfiles";
import SellerProfiles from "../profiles/SellerProfiles";

const Users = () => {
  return (
    <Row>
      <Col md={6}>
        <Card className="mx-auto">
          <Card.Body>
            <Card.Title>Admin List</Card.Title>
            <Card.Text>
              <SellerProfiles />
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card className="mx-auto">
          <Card.Body>
            <Card.Title>Buyers List</Card.Title>
            <Card.Text>
              <BuyerProfiles />
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Users;
