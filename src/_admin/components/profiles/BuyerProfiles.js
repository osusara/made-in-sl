import React, { Fragment, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getBuyerProfiles } from "../../actions/profile";
import ProfileItem from "./BuyerProfileItem";

const Profiles = ({ getBuyerProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getBuyerProfiles();
  }, [getBuyerProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Container className="my-3 user-background">
            <h1 className="">Buyers</h1>
            <p className=""> Browse the Buyers</p>
            <Row>
              <Col md={8} xs={10} className="">
                {profiles.length > 0 ? (
                  profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                  ))
                ) : (
                  <h4>No Profiles found</h4>
                )}
              </Col>
            </Row>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getBuyerProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getBuyerProfiles })(Profiles);
