import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectMenuVisible } from "../../../../Store/UI/UI.selector";
import { setMenuVisible } from "../../../../Store/UI/UI.action";

class NavbarToggle extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    setMenuVisible();
  }

  render() {
    return (
      <nav className="nav">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          onClick={this.handleClick}
          className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center"
        >
          <i className="material-icons">&#xE5D2;</i>
        </a>
      </nav>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  menuVisible: selectMenuVisible,
});
const mapDispatchToProps = (dispatch) => ({
  setMenuVisible: () => dispatch(setMenuVisible()),
});
export default connect(mapStateToProps, mapDispatchToProps)(NavbarToggle);
