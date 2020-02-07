import React, { Fragment } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../actions/product";

const ProductItem = ({
  addLike,
  product: {
    _id,
    image,
    title,
    description,
    price,
    name,
    avatar,
    user,
    likes,
    reviews,
    date
  },
  auth,
  showActions
}) => (
  <Card className="shadow-sm border-none product-item" style={{ height: "100%" }}>
    <Card.Body>
      <Image
        src={process.env.PUBLIC_URL + `/products/${image}`}
        style={{ width: "100%" }}
        className="product-image mb-2"
      />
      <Card.Title>
        <h4>{title}</h4>
      </Card.Title>
      <Card.Text>
        <p>
          {description}
          <br />
          <small>
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </small>
          <br />
          <strong className="text-color-1">${price}</strong>
        </p>
      </Card.Text>

      {showActions && (
        <Fragment>
          <Link onClick={e => addLike(_id)}>
            <span>
              <i class="fas fa-star"></i> {likes.length}
            </span>
          </Link>

          <Link
            to={`/products/${_id}`}
            className="align-top btn btn-custom-1 float-right"
          >
            Add to Cart
          </Link>
        </Fragment>
      )}
    </Card.Body>
  </Card>
);

ProductItem.defaultProps = {
  showActions: true
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(null, { addLike })(ProductItem);
