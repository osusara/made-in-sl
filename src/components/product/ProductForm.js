import React, { useState } from "react";
import { Container, Row, Col, Input, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProduct } from "../../actions/product";

const ProductForm = ({ addProduct }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "none"
  });

  const { title, description, price, category } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Container>
      <div className="bg-primary p">
        <h3>Add Product</h3>
      </div>

      <Form
        onSubmit={e => {
          e.preventDefault();
          addProduct({ title, description, price, category });
          setFormData({
            title: "",
            description: "",
            price: "",
            category: "none"
          });
        }}
      >
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            placeholder="Product Title"
            onChange={e => onChange(e)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            onChange={e => onChange(e)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={price}
            placeholder="Product Price"
            onChange={e => onChange(e)}
            required
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Example select</Form.Label>
          <Form.Control
            as="select"
            name="category"
            onChange={e => onChange(e)}
            required
          >
            <option value="none" hidden>- Select Category -</option>
            <option value="Tea">Tea</option>
            <option value="Spices">Spices</option>
            <option value="Handcraft">Handcrafts</option>
            <option value="Ceramic">Ceramics</option>
          </Form.Control>
        </Form.Group>
      </Form>
      
    </Container>
  );
};

ProductForm.propTypes = {
  addProduct: PropTypes.func.isRequired
};

export default connect(null, { addProduct })(ProductForm);
