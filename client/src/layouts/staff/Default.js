import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../../components/staff/layout/MainNavbar/MainNavbar";
import MainSidebar from "../../components/staff/layout/MainSidebar/MainSidebar";
import MainFooter from "../../components/staff/layout/MainFooter";
const DefaultLayout = ({ children, noNavbar, noFooter }) => {
  return (
    <Container fluid>
      <Row>
        <MainSidebar />
        <Col
          className="main-content p-0"
          lg={{ size: 10, offset: 2 }}
          md={{ size: 9, offset: 3 }}
          sm="12"
          tag="main"
        >
          {!noNavbar && <MainNavbar />}
          {children}
          {!noFooter && <MainFooter />}
        </Col>
      </Row>
    </Container>
  )
};

DefaultLayout.propTypes = {
  noNavbar: PropTypes.bool,
  noFooter: PropTypes.bool,
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false,
};

export default DefaultLayout;
