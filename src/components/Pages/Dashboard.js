import React, { useEffect, useState, Fragment } from "react";
import { Row, Col, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getBuyerProfiles } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import Charts from "../dashboard/Charts";

const Dashboard = ({getBuyerProfiles, profile: { buyerprofiles, sellerprofiles, loading } }) => {
  useEffect(() => {
    getBuyerProfiles();
    // updateData(buyerprofiles, sellerprofiles);
  }, [getBuyerProfiles]);

  const [data, setData] = useState({
    numberOfBuyers: 3,
    numberOfSellers: 1,
    numberOfProducts: 25,
  })

  const updateData = (buyerprofiles, sellerprofiles) => {
    setData({
      numberOfBuyers: buyerprofiles,
      numberOfSellers: sellerprofiles,
    })
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Row>
            <Col className="mx-auto mx-5 px-5">
              <Card className="mx-auto mx-5">
                <Card.Body>
                  <span>Buyers</span>
                  <h1 className="float-right">
                    <i className="fas fa-user"></i> {data.numberOfBuyers}
                  </h1>
                </Card.Body>
              </Card>
            </Col>
            <Col className="mx-auto mx-5 px-5">
              <Card className="mx-auto mx-5">
                <Card.Body>
                  <span>Sellers</span>
                  <h1 className="float-right">
                    <i className="fas fa-user"></i> {data.numberOfSellers}
                  </h1>
                </Card.Body>
              </Card>
            </Col>
            <Col className="mx-auto mx-5 px-5">
              <Card className="mx-auto mx-5">
                <Card.Body>
                  <span>Products</span>
                  <h1 className="float-right">
                    <i className="fas fa-shopping-bag"></i> {data.numberOfProducts}
                  </h1>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Charts buyerprofiles={buyerprofiles} sellerprofiles={sellerprofiles} />
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  getBuyerProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getBuyerProfiles })(Dashboard);
