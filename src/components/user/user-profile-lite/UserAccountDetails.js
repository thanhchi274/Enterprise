import React, {useState} from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../Store/user/user.selector";
import {updateUserProfileStart} from '../../../Store/user/user.action'
const UserAccountDetails = ({ title,currentUser,updateUserProfileStart}) => {
  const [userCredentials, setUserCredentials] = useState({
    firstName:"", lastName:""
  })
  const {firstName, lastName} = userCredentials
  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserCredentials({...userCredentials,
      [name]: value,
    });
  };
  const handleSubmit = async event => {
    event.preventDefault();
    let displayName = firstName +" "+ lastName
    if(firstName===""||lastName===""){
      alert('Please fill all it to continue')
    }
    else {
      updateUserProfileStart(displayName)
      setUserCredentials({  firstName:"", lastName:"" });
    }
  };
return(
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Row form>
                <Col sm="6" md="6" lg="6" className="form-group">
                  <label htmlFor="feFirstName">First Name</label>
                  <FormInput
                    id="feFirstName"
                    placeholder="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                  />
                </Col>
                <Col sm="6" md="6" lg="6" className="form-group">
                  <label htmlFor="feLastName">Last Name</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Last Name"
                    name='lastName'
                    value={lastName}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="feEmail">Email</label>
                  <FormInput
                    type="email"
                    id="feEmail"
                    placeholder="Email Address"
                    value={currentUser.email}
                    disabled
                  />
                </Col>
              </Row>
              <Button theme="accent">Update Account</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
);
}
UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details"
};
const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser
})

const mapDispatchToProps =(dispatch)=> ({
  updateUserProfileStart: (data)=>dispatch(updateUserProfileStart(data))
})

export default connect(mapStateToProps,mapDispatchToProps) (UserAccountDetails);
