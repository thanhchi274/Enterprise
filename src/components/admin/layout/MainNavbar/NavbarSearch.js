import React from "react";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
} from "shards-react";

export default () => (
  <Form
    className="main-navbar__search w-100 d-none d-md-flex d-lg-flex"
    style={{ paddingLeft: "10px" }}
  >
    <InputGroup seamless className="ml-3"></InputGroup>
  </Form>
);
