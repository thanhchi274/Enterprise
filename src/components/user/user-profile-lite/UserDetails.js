import React, {useState} from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress,
} from "shards-react";

//Images
import user_avatar from "../../../assets/images/avatars/0.jpg";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../Store/user/user.selector";

const UserDetails = ({ userDetails, currentUser }) => (
  <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={userDetails.avatar}
          alt={currentUser.displayName?currentUser.displayName:currentUser.email}
          width="110"
        />
      </div>
      {console.log(currentUser.providerData[0].displayName)}
      <h4 className="mb-0">{currentUser.displayName||currentUser.providerData[0].displayName||currentUser.email}</h4>
    </CardHeader>
  </Card>
);

UserDetails.propTypes = {
  userDetails: PropTypes.object,
};

UserDetails.defaultProps = {
  userDetails: {
    avatar: user_avatar
  },
};
const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
