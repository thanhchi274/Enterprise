import React from "react";
import { connect } from "react-redux";
import { setMenuVisible } from "../../../../Store/UI/UI.action";

const NavbarToggle =({setMenuVisible})=> {
    return (
      <nav className="nav">
        <a
          href="#"
          onClick={()=>setMenuVisible()}
          className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center"
        >
          <i className="material-icons">&#xE5D2;</i>
        </a>
      </nav>
    );
}
const mapDispatchToProps = dispatch => ({
  setMenuVisible: () => dispatch(setMenuVisible()),
});
export default connect(null, mapDispatchToProps)(NavbarToggle);
