import React from "react";
import PropTypes from "prop-types";
import { Navbar, NavbarBrand } from "shards-react";
import { connect } from "react-redux";
import { setMenuVisible } from "../../../../Store/UI/UI.action";
//Images
import logo from "../../../../assets/images/magazine-system-logo.svg";

const SidebarMainNavbar = ({ hideLogoText, setMenuVisible }) => {

  return (
    <div className="main-navbar">
      <Navbar
        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
        type="light"
      >
        <NavbarBrand
          className="w-100 mr-0"
          href="#"
          style={{ lineHeight: "25px" }}
        >
          <div className="d-table m-auto">
            <img
              id="main-logo"
              className="d-inline-block align-top mr-1"
              style={{ maxWidth: "25px" }}
              src={logo}
              alt="Magazine System"
            />
            {!hideLogoText && (
              <span
                className="d-none d-md-inline ml-1"
                style={{ marginLeft: "5px" }}
              >
                Magazine System
              </span>
            )}
          </div>
        </NavbarBrand>
        {/* eslint-disable-next-line */}
        <a
          className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
          onClick={setMenuVisible}
        >
          <i className="material-icons">&#xE5C4;</i>
        </a>
      </Navbar>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setMenuVisible: () => dispatch(setMenuVisible()),
});

export default connect(null, mapDispatchToProps)(SidebarMainNavbar);
