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
import DragDropZone from "../dropzoneDiaglog/dropzoneDialog.component";
const SidebarActions = ({ editPost, data }) => {
  let isOutDate = new Date().toLocaleDateString()>new Date(data).toLocaleDateString()?1:-1
  const [agreeTerm, setAgreeTerm] = React.useState(false);
        return (
          <Card small className="mb-3">
            <CardBody className="p-0">
              <ListGroup flush>
                <h5 style={{ margin: "10px" }}>{new Date(data).toLocaleDateString()}</h5>
                <ListGroupItem className="px-3 border-0">
                  <form
                    className="d-flex my-3"
                    style={{ alignItems: "center" }}
                  >
                    <input
                      type="checkbox"
                      defaultValue={agreeTerm}
                      disabled={isOutDate===1?false:true}
                      onClick={()=>setAgreeTerm(!agreeTerm)}
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
                  {agreeTerm?<DragDropZone data={data} />:null}
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
