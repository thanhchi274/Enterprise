import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
//Images
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../../../Store/user/user.selector";
import user_avatar from "./../../../../../assets/images/avatars/0.jpg"
import { signOutStart } from "./../../../../../Store/user/user.action";
import { connect } from "react-redux";

class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <NavItem tag={Dropdown} className="d-flex align-items-center" caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">

          <span className="d-none d-md-inline-block">Sierra Brooks</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="staff-profile-lite">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} to="/" onClick={signOutStart} className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
const mapStateToProps = createStructuredSelector ({
  currentUser:selectCurrentUser
})
const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserActions)