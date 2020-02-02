import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deleteProduct } from "../../actions/product";

const ProductItem = ({
  addLike,
  removeLike,
  deleteProduct,
  auth,
  product: { _id, image, title, description, price, name, avatar, user, likes, reviews, date },
  showActions
}) => (
  <div class="product bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img class="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <h4>{title}</h4>
      <p class="my-1">{description}</p>
      <p>{price}</p>
      <p class="product-date">
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>

      {showActions && (
        <Fragment>
          <button
            onClick={e => addLike(_id)}
            type="button"
            class="btn btn-light"
          >
            <i class="fas fa-thumbs-up"></i>{" "}
            <span>{likes.length}</span>
          </button>
          <button
            onClick={e => removeLike(_id)}
            type="button"
            class="btn btn-light"
          >
            <i class="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/products/${_id}`} class="btn btn-primary">
            Reviews{" "}<span class="comment-count">{reviews.length}</span>
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={e => deleteProduct(_id)}
              type="button"
              class="btn btn-danger"
            >
              <i class="fas fa-times"></i>
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

ProductItem.defaultProps = {
  showActions: true
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deleteProduct })(
  ProductItem
);
