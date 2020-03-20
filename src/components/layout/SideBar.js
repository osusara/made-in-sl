import React from "react";
import { ListGroup, Nav, Tab, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const SideNavigation = () => {
  return (
    // <div className="sidebar-fixed position-fixed">
    //   <ListGroup className="list-group-flush">
    //     <ListGroup.Item>
    //       <Link exact={true} to="/" className="nav-link">
    //         Dashboard
    //       </Link>
    //     </ListGroup.Item>
    //     <ListGroup.Item>
    //       <Link exact={true} to="/" className="nav-link">
    //         Dashboard
    //       </Link>
    //     </ListGroup.Item>
    //     <ListGroup.Item>
    //       <Link exact={true} to="/" className="nav-link">
    //         Dashboard
    //       </Link>
    //     </ListGroup.Item>
    //     <ListGroup.Item>
    //       <Link exact={true} to="/" className="nav-link">
    //         Dashboard
    //       </Link>
    //     </ListGroup.Item>
    //   </ListGroup>
    // </div>

    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Tab 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Tab 2</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              tab 1
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              tab 2
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default SideNavigation;
