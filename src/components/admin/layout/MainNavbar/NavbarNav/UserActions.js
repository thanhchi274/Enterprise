import React from "react";
import { connect } from "react-redux";
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
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../../../Store/user/user.selector";
import { signOutStart } from "./../../../../../Store/user/user.action";
import Spinner from '../../../../spinner/spinner.component'
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
    let {currentUser,signOutStart}= this.props
    return (
      <NavItem className="d-flex align-items-center" tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3 d-flex align-items-center">
          <span className="d-none d-md-inline-block"> {currentUser.displayName|| currentUser.email|| currentUser.providerData[0].displayName}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} small open={this.state.visible}>
          <DropdownItem tag={Link} to="user-profile">
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
