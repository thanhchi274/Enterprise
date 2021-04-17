import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  FormTextarea,
  Button,
} from "shards-react";
import { connect } from "react-redux";
import { setComment } from "../../../Store/data/data.action";
import { fetchEachEventStart } from "../../../Store/data/data.action";
import Spinner from '../../spinner/spinner.component'
const DetailAndComment = ({
  data,
  faulty,
  title,
  fetchEachEventStart,
  setComment,
  staffFaulty
}) => {
  const [comment, setContentComment] = useState(null);
  const [post, setPost] = useState(null);
  useEffect(() => {
    setPost(data);
  }, [data]);
  const handleSubmitComment = async (e, item) => {
    e.preventDefault();
    if(staffFaulty===faulty){
      const commentPost = {
        ...item,
        comment: { message: comment, createAt: new Date().toLocaleDateString() },
      };
      await Promise.all([
        (async () => setComment(commentPost))(),
        (async () => fetchEachEventStart(faulty))(),
      ]);
    }
    else{
      alert("Sorry you don't have permission to comment this post")
    }
  };
  const handleInputComment = (e) => {
    var content = e.target.value;
    if (content !== " " && content.length > 0) {
      setContentComment(content);
    }
  };
  return post ? (
    <Card small className="h-100">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
      </CardHeader>
      <CardBody className="d-flex flex-column">
        <Form className="quick-post-form">
          <FormGroup></FormGroup>
          <FormGroup>
            <FormTextarea
              placeholder="Write comment here..."
              onChange={handleInputComment}
            />
          </FormGroup>
          <FormGroup className="mb-0">
            <Button
              theme="accent"
              type="submit"
              onClick={(e) => handleSubmitComment(e, data)}
            >
              Comment
            </Button>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  ) : (
    <Spinner/>
  );
};

DetailAndComment.propTypes = {
  title: PropTypes.string,
};

DetailAndComment.defaultProps = {
  title: "Details Comment",
};
const mapDispatchToProps = (dispatch) => ({
  setComment: (data) => dispatch(setComment(data)),
  fetchEachEventStart: (data) => dispatch(fetchEachEventStart(data)),
});
export default connect(null, mapDispatchToProps)(DetailAndComment);
