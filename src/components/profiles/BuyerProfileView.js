import React, { Fragment, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./BuyerProfileBody";
import { getBuyerProfileById } from "../../actions/profile";

const Profile = ({
  getBuyerProfileById,
  profile: { profile, loading },
  match
}) => {
  useEffect(() => {
    getBuyerProfileById(match.params.id);
  }, [getBuyerProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Container className="my-5">
            <h1>Buyer Profile</h1>
            <Card className="my-3">
              <Card.Body>
                <ProfileTop profile={profile} />
              </Card.Body>
            </Card>
            <Link to="/buyer/profiles" className="btn btn-light my-3">
              Go Back to Buyers List
            </Link>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getBuyerProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getBuyerProfileById })(Profile);
