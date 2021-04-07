import React from "react";
import { Col, Card, CardBody, Badge } from "shards-react";
import DragDropZone from "../dropzoneDiaglog/dropzoneDialog.component";
import PostModal from "./PostModal";

const PostListOne = ({ post }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Col lg="3" md="6" sm="12" className="mb-4">
      <Card small className="card-post card-post--1">
        <div
          className="card-post__image"
          style={{ backgroundImage: `url(${'https://picsum.photos/200/300'})` }}
        >
          <Badge
            pill
            className={`card-post__category}`}
          >
            {post.createAt}
          </Badge>
          <div className="card-post__author d-flex">
            <a
              href="#"
              className="card-post__author-avatar card-post__author-avatar--small"
              style={{ backgroundImage: `url('${'https://picsum.photos/200/300'}')` }}
            >
              Written by {post.end}
            </a>
          </div>
        </div>
        <CardBody>
          <h5 className="card-title">
            <a href="#" className="text-fiord-blue" onClick={handleOpenModal}>
              {post.status}
            </a>
          </h5>
          <p className="card-text d-inline-block mb-3">{post.end}</p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted">{post.end}</span>
          </div>
        </CardBody>
      </Card>
      <PostModal open={open} handleCloseModal={handleCloseModal} post={post} />
    </Col>
  );
};

export default PostListOne;
