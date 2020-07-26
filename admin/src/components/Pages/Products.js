import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import ProductForm from "../product/ProductForm";

const Products = () => {
  return (
    <Container fluid={true}>
      <h2 className="text-primary">Products</h2>
      <hr />
      <Row>
        <Col md={6} xs={12}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Add Products</Card.Title>
              <Card.Text>
                <hr style={{ width: "50%" }} />
                <ProductForm />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Products;
