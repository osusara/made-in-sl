import React, { useState } from "react";
import { Container, Row, Col, Input, Button, Form } from "react-bootstrap";
import ImageUploader from "react-images-upload";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProduct } from "../../actions/product";

const ProductForm = ({ addProduct }) => {
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    description: "",
    price: "",
    category: "none"
  });

  const { image, title, description, price, category } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onDrop = picture =>
    setFormData({ image: picture[0].name });

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        addProduct(formData);
      }}
    >
      <Form.Group>
        <ImageUploader
          name="image"
          value={image}
          withIcon={true}
          withPreview={true}
          onChange={onDrop}
          imgExtension={[".jpg"]}
          maxFileSize={5242880}
          singleImage={true}
        />
      </Form.Group>
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
          name="description"
          value={description}
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
          value={category}
          onChange={e => onChange(e)}
          required
        >
          <option value="none" hidden>
            - Select Category -
          </option>
          <option value="Tea">Tea</option>
          <option value="Spices">Spices</option>
          <option value="Handcraft">Handcrafts</option>
          <option value="Ceramic">Ceramics</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit" className="mx-auto text-center">
        Submit
      </Button>
    </Form>
  );
};

ProductForm.propTypes = {
  addProduct: PropTypes.func.isRequired
};

export default connect(null, { addProduct })(ProductForm);
