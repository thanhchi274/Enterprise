import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "shards-react";
import user_avatar from "./../../../../../assets/images/avatars/0.jpg";
import { connect } from 'react-redux'
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../../../Store/user/user.selector";
 class UserActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.toggleUserActions = this.toggleUserActions.bind(this);
  }
  toggleUserActions() {
    this.setState({
      visible: !this.state.visible,
    });
  }
  componentDidUpdate(){
    console.log(this.props)
  }
  render() {
    console.log(this.props)
    return (
      <Dropdown  caret toggle={this.toggleUserActions}>
        <Link className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={user_avatar}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">Sierra Brooks</span>
        </Link>
        <DropdownMenu right small open={this.state.visible}>
          <DropdownItem divider />
          <Link to="/" className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </Link>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
const mapStateToProps = createStructuredSelector ({
  currentUser:selectCurrentUser
})
export default connect(mapStateToProps, null)(UserActions)