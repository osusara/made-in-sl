import React from "react";
import { Card, Image } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addToCart } from "../../actions/cart";

const ProductItem = ({
  product: {
    _id,
    image,
    title,
    description,
    price,
    name,
    avatar,
    user,
    reviews,
    date
  },
  auth,
  showActions,
  addToCart
}) => (
  <Card
    className="shadow-sm border-none product-item"
    style={{ height: "100%" }}
  >
    <Card.Body>
      <Link to={`/products/${_id}`} className="link">
        <Image
          src={process.env.PUBLIC_URL + `/products/${image}`}
          style={{ width: "100%" }}
          className="product-image mb-2"
        />
        <Card.Title>
          <h4 className="text-dark">{title}</h4>
        </Card.Title>
      </Link>
      <Card.Text>
        <p>{description}</p>
      </Card.Text>

      {showActions && (
        <div className="float-right">
          <h5>
            <strong className="">${price}</strong>{" "}
            <Link
              className="btn btn-custom-1 mx-auto"
              onClick={e => addToCart(_id, {title: title, price: price, image: image, description: description, qty: 1})}
            >
              Add to Cart <i className="fas fa-cart-plus"></i>
            </Link>
          </h5>
        </div>
      )}
    </Card.Body>
  </Card>
);

ProductItem.defaultProps = {
  showActions: true
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired
};

export default connect(null, { addToCart })(ProductItem);
