import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import BuyerProfiles from "../profiles/BuyerProfiles";
import SellerProfiles from "../profiles/SellerProfiles";

const Users = () => {
  return (
    <Container fluid={true}>
      <h2 className="text-primary">Users</h2>
      <hr />
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Admin List</Card.Title>
              <Card.Text>
                <hr style={{ width: "50%" }} />
                <SellerProfiles />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Buyers List</Card.Title>
              <Card.Text>
                <BuyerProfiles />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
