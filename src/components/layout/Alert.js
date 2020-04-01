import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Toast } from "react-bootstrap";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} style={{ position: "fixed", zIndex: "99", float: "right" }}>
      <Toast className="mx-3 my-5">
        <Toast.Body className={`alert-${alert.type}`}>
          <i className="fas fa-bell"></i>{" "}
          <strong className="mr-auto">{alert.msg}</strong>
        </Toast.Body>
      </Toast>
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert // root reducer alert
});

export default connect(mapStateToProps)(Alert);
