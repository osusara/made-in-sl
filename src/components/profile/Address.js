import React, { Fragment } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAddress } from "../../actions/profile";

const Address = ({ address, deleteAddress }) => {
  const addresses = address.map(add => (
    <ul key={add._id}>
      <li>{add.no}</li>
      <li>{add.street}</li>
      <li>{add.city}</li>
      <li>{add.postalcode}</li>
      <li>{add.province}</li>
      <li>{add.region}</li>
      <li>
        <Button
          className="btn btn-custom-2"
          onClick={() => deleteAddress(add._id)}
        >
          Remove Address
        </Button>
      </li>
    </ul>
  ));

  return (
    <Fragment>
      <Container>
        <Row style={{ height: "100%" }} className="user-page">
          <Col lg={6} md={12} sm={12}>
            <Col md={8} sm={10} className="user-card">
              <Card className="my-5">
                <Card.Body>{addresses}</Card.Body>
              </Card>
            </Col>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

Address.propTypes = {
  address: PropTypes.string.isRequired,
  deleteAddress: PropTypes.func.isRequired
};

export default connect(null, { deleteAddress })(Address);
