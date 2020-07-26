import React, { useEffect, Fragment } from "react";
import {Card, Button, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

import Spinner from "../layout/Spinner";
import CreateProfile from "./CreateProfile";

const Profile = ({
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  return loading && profile === null && user === null ? (
    <Spinner />
  ) : (
    <Col lg={10} md={10} xs={12} className="user-card my-3">
      {user !== null ? (
        <Fragment>
          <span className="">
            <i className="fas fa-user"></i> Username: {user && user.username}
          </span>
          <br />
          <span>User ID: {user._id}</span>
        </Fragment>
      ) : (<Spinner />)}
      

      {/* check if the profile is available */}
      {profile !== null ? (
        <Fragment>
          <Card
            style={{ borderRadius: "1rem", border: "none" }}
            className="my-3 px-3 bg-dark"
          >
            <Card.Body className="text-light">
              <h2>{profile.company}</h2>
              <span>Contact: {profile.phone}</span>
              <br />
              <span>Email: {user.email}</span>
              <br />
              <br />
              <div className="my-2">
                <Button
                  className="btn btn-danger float-right"
                  onClick={() => deleteAccount()}
                >
                  <i className="fas fa-user-minus"></i> Delete Account
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <CreateProfile />
        </Fragment>
      )}
    </Col>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { deleteAccount })(
  Profile
);
