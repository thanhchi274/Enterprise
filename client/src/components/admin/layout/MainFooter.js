import React from "react";
import PropTypes from "prop-types";
import { Container, Row } from "shards-react";

const MainFooter = ({ contained, menuItems, copyright }) => (
  <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
    <Container fluid={contained}>
      <Row style={{ justifyContent: "center" }}>
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

MainFooter.defaultProps = {
  contained: false,
  copyright: "Copyright © 2021 Magazine System",
};

export default MainFooter;
