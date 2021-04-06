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

const editStyle = {
  position: "absolute",
  marginRight: "20px",
  right: "0",
};

const SidebarActions = ({ title, editPost }) => {
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
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
      </CardHeader>

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
            <Button
              theme="accent"
              size="sm"
              className="ml-auto"
              id="btn_publish"
            >
              <i className="material-icons">
                {editPost ? "save" : "file_copy"}
              </i>{" "}
              {editPost ? "Save" : "Publish"}
            </Button>
          </ListGroupItem>
        </ListGroup>
      </CardBody>
    </Card>
  );
};

SidebarActions.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  editPost: PropTypes.object,
};

SidebarActions.defaultProps = {
  title: "Actions",
};

export default SidebarActions;
