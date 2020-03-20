import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import BuyerProfiles from "../profiles/BuyerProfiles";

const Users = () => {
  return (
    <Row>
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
