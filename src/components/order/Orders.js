import React, { useEffect } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOrder } from "../../actions/order";
import Spinner from "../layout/Spinner";

import OrderEmpty from "./OrderEmpty";
import OrderItem from "./OrderItem";

const Order = ({ getOrder, order: { order, loading } }) => {
  useEffect(() => {
    getOrder();
  }, [getOrder]);

  return loading ? (
    <Spinner />
  ) : (
    <Container fluid={true}>
      <h4 className="text-center">Your Recent Orders</h4>
      <Container>
        {order === null ? (
          <OrderEmpty />
        ) : order.length === 0 ? (
          <OrderEmpty />
        ) : (
          <Container>
            {order.map(item => (
              <OrderItem key={item._id} item={item} />
            ))}
          </Container>
        )}
      </Container>
    </Container>
  );
};

Order.propTypes = {
  getOrder: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  order: state.order
});

export default connect(mapStateToProps, { getOrder })(Order);
