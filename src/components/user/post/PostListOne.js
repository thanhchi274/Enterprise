import React from "react";
import { Col, Card, CardBody, Badge } from "shards-react";
import DragDropZone from '../dropzoneDiaglog/dropzoneDialog.component'
import PostModal from "./PostModal"

const PostListOne = ({ post }) => {
  const [open, setOpen] = React.useState(false);
  const [agreeTerm, setAgreeTerm] = React.useState(false)
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleAgreeTerm = (event)=>{
    setAgreeTerm(!agreeTerm)
  }
  return (
    <Col lg="3" md="6" sm="12" className="mb-4">
      <Card small className="card-post card-post--1">
        <div
          className="card-post__image"
          style={{ backgroundImage: `url(${post.backgoundImage})` }}
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
              style={{ backgroundImage: `url('${post.backgoundImage}')` }}
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
          <div className="d-flex justify-content-between align-items-center">
          {agreeTerm?<DragDropZone data={post}/>:null}
          <span className="text-muted">{post.date}</span>
          </div>
        <form onClick={handleAgreeTerm} className='d-flex my-3 justify-content-between'>

          <input  type="checkbox" defaultValue={agreeTerm} />
          <span>
          Agree with
          <a href="/terms-and-conditions"> Terms & Conditions</a><br /></span>
        </form>

        </CardBody>
      </Card>
      <PostModal open={open} handleCloseModal={handleCloseModal} post={post}/>
    </Col>
  );
};

export default PostListOne;
