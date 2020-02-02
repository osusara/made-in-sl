import React, { Fragment } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../actions/product";

const ProductItem = ({
  addLike,
  removeLike,
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
  showActions
}) => (
  <Card className="shadow-sm border-none">
    <Card.Body>
      <Image
        src={process.env.PUBLIC_URL + `/products/${image}`}
        style={{ width: "100%" }}
        rounded
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
          <button
            onClick={e => addLike(_id)}
            type="button"
            class="btn btn-light mx-1"
          >
            <i class="fas fa-thumbs-up"></i> <span>{likes.length}</span>
          </button>
          <button
            onClick={e => removeLike(_id)}
            type="button"
            class="btn btn-light mx-1"
          >
            <i class="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/products/${_id}`} class="btn btn-primary mx-1">
            Reviews <span class="comment-count">{reviews.length}</span>
          </Link>
        </Fragment>
      )}

      {/* <div>
        <Link to={`/seller/profile/${user}`}>
          <img class="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div> */}
    </Card.Body>
  </Card>
);

ProductItem.defaultProps = {
  showActions: true
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

export default connect(null, { addLike, removeLike })(ProductItem);
