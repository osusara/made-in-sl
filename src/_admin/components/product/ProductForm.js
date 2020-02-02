import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProduct } from "../../actions/product";

const ProductForm = ({ addProduct }) => {
  const [text, setText] = useState();
  const [rate, setRate] = useState();

  return (
    <div className="product-form">
      <div className="bg-primary p">
        <h3>Leave A Review</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addProduct({ text });
          setText("");
        }}
      >
        <input
          type="text"
          value={rate}
          name="rate"
          onChange={e => setRate(e.target.value)}
        />
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a Product"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

ProductForm.propTypes = {
  addProduct: PropTypes.func.isRequired
};

export default connect(null, { addProduct })(ProductForm);
