/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
} from "shards-react";
import axios from 'axios'
import DragDropZone from '../dropzoneDiaglog/dropzoneDialog.component'
const editStyle = {
  position: "absolute",
  marginRight: "20px",
  right: "0",
};
const SidebarActions = ({ editPost }) => {
  const [agreeTerm, setAgreeTerm] = React.useState(false);
  React.useEffect(() => {
    const element = document.getElementById("btn_publish");
    if (agreeTerm) {
      element.disabled = false;
    } else {
      element.disabled = true;
    }
  }, [agreeTerm]);

  const handleAgreeTerm = () => {
    setAgreeTerm(!agreeTerm);
  };
  console.log(editPost);
  return (
    <Card small className="mb-3">
      <CardBody className="p-0">
        <ListGroup flush>
          <ListGroupItem className="px-3 border-0">
            <form className="d-flex my-3" style={{ alignItems: "center" }}>
              <input
                type="checkbox"
                defaultValue={agreeTerm}
                onClick={handleAgreeTerm}
              />
              <span style={{ marginLeft: "10px" }}>
                Agree with
                <a href="/terms-and-conditions" target="_blank">
                  {" "}
                  Terms & Conditions
                </a>
                <br />
              </span>
            </form>
            <DragDropZone/>
          </ListGroupItem>
        </ListGroup>
      </CardBody>
    </Card>
  );
};

SidebarActions.propTypes = {

  title: PropTypes.string,
  editPost: PropTypes.object,
};

export default SidebarActions;
