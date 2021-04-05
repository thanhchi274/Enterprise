import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import MainNavbar from "../../components/user/layout/MainNavbar/MainNavbar";
import MainSidebar from "../../components/user/layout/MainSidebar/MainSidebar";
import MainFooter from "../../components/user/layout/MainFooter";
const UserLayout = ({ children, noNavbar, noFooter,...otherprops }) => {
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

UserLayout.propTypes = {
  noNavbar: PropTypes.bool,
  noFooter: PropTypes.bool,
};

UserLayout.defaultProps = {
  noNavbar: false,
  noFooter: false,
};

export default UserLayout;
