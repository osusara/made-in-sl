import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addAddress } from "../../actions/profile";

const AddAddress = ({ addAddress, history }) => {
  const [formData, setFormData] = useState({
    no: "",
    street: "",
    city: "",
    postalcode: "",
    province: "",
    region: ""
  });

  const { no, street, city, postalcode, province, region } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addAddress(formData, history);
  }

  return (
    <Fragment className="my-2">
      <Container
        style={{ height: "84vh" }}
        className="login-background user-background"
        fluid={true}
      >
        <Row style={{ height: "100%" }} className="user-page">
          <Col lg={6} md={12} sm={12}>
            <Col md={8} sm={10} className="user-card">
              <Card className="my-5">
                <Card.Body>
                  <Card.Title className="text-center mb-5">
                    <h1>Add Your Address</h1>
                  </Card.Title>
                  <Card.Text>
                    <Form onSubmit={e => onSubmit(e)}>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeholder="No."
                          className="text-center user-input"
                          name="no"
                          value={no}
                          onChange={e => onChange(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeholder="Street"
                          className="text-center user-input"
                          name="street"
                          value={street}
                          onChange={e => onChange(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeholder="City"
                          className="text-center user-input"
                          name="city"
                          value={city}
                          onChange={e => onChange(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeholder="Postal Code"
                          className="text-center user-input"
                          name="postalcode"
                          value={postalcode}
                          onChange={e => onChange(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeholder="Province"
                          className="text-center user-input"
                          name="province"
                          value={province}
                          onChange={e => onChange(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          placeholder="Region"
                          className="text-center user-input"
                          name="region"
                          value={region}
                          onChange={e => onChange(e)}
                        />
                      </Form.Group>
                      <Button type="submit" className="btn-custom-1 my-1">
                        Add
                      </Button>
                      <Link className="btn btn-custom-2 my-1 mx-1" to="/profile">
                        Go Back
                      </Link>
                    </Form>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

AddAddress.propTypes = {
  addAddress: PropTypes.func.isRequired
};

export default connect(null, { addAddress })(AddAddress);
