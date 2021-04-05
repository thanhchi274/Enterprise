import React from "react";
import { Col, Card, CardBody, Badge } from "shards-react";

import PostModal from "./PostModal"

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
          style={{ backgroundImage: `url(${post.backgroundImage})` }}
        >
          <Badge
            pill
            className={`card-post__category bg-${post.categoryTheme}`}
          >
            {post.category}
          </Badge>
          <div className="card-post__author d-flex">
            <a
              href="#"
              className="card-post__author-avatar card-post__author-avatar--small"
              style={{ backgroundImage: `url('${post.authorAvatar}')` }}
            >
              Written by {post.author}
            </a>
          </div>
        </div>
        <CardBody>
          <h5 className="card-title">
            <a href="#" className="text-fiord-blue" onClick={handleOpenModal}>
              {post.title}
            </a>
          </h5>
          <p className="card-text d-inline-block mb-3">{post.body}</p>
          <span className="text-muted">{post.date}</span>
        </CardBody>
      </Card>
      <PostModal open={open} handleCloseModal={handleCloseModal} post={post}/>
    </Col>
  );
};

export default PostListOne;
