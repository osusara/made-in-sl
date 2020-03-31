import React, { useEffect } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOrder } from "../../actions/order";
import Spinner from "../layout/Spinner";

const Order = ({ getOrder, order: { order, loading } }) => {
  useEffect(() => {
    getOrder();
  }, [getOrder]);

  return loading ? (
    <Spinner />
  ) : (
    <Container
      fluid={true}
      className="register-background user-foreground py-4"
    >
      <Container>
        <Card style={{ borderRadius: "1rem" }} className="shadow mb-5 mt-4">
          <Card.Body>
            <ListGroup>
              
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
      )}
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
