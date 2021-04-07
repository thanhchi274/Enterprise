import React from "react";
import { Card, CardBody, Form, FormInput } from "shards-react";
import SideBarActions from '../new-post/SidebarActions'
const Editor = ({ editPost }) => {
 return (
  <Card small className="mb-3">
    <CardBody>
      <Form className="add-new-post">
        <FormInput
          size="lg"
          className="mb-3"
          placeholder="Your Post Title"
          defaultValue={editPost ? editPost.title : ""}
        />
        <SideBarActions/>
      </Form>
    </CardBody>
  </Card>
)
}

export default Editor;
