import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Nav, NavItem, NavLink } from "shards-react";
import { Link } from "react-router-dom";

const MainFooter = ({ contained, menuItems, copyright }) => (
  <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
    <Container fluid={contained}>
      <Row style={{ justifyContent: "space-between" }}>
        <Nav style={{ width: "auto" }}>
        </Nav>
        <span
          className="copyright ml-auto my-auto mr-2"
          style={{ width: "auto" }}
        >
          {copyright}
        </span>
      </Row>
    </Container>
  </footer>
);

MainFooter.propTypes = {
  contained: PropTypes.bool,
  menuItems: PropTypes.array,
  copyright: PropTypes.string,
};

export default MainFooter;
