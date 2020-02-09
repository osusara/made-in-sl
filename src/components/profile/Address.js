import React, { Fragment } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAddress } from "../../actions/profile";

const Address = ({ address, deleteAddress }) => {
  const addresses = address.map(add => (
    <Col lg={4} md={6} sm={6} xs={6}>
      <Card className="my-3 shadow-sm">
        <Card.Body>
          <span key={add._id}>
            {add.no}, {add.street}<br />
            {add.city}, {add.postalcode}<br />
            {add.province}, {add.region}<br />

            <Button className="btn btn-dark btn-sm my-2" onClick={() => deleteAddress(add._id)}>
              Delete Address
            </Button>
          </span>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <Fragment>
      <Container>
        <Row style={{ height: "100%" }}>
            {addresses}
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
