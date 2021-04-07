import React, { useEffect } from "react";
import { Col, Card, CardBody, Badge } from "shards-react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  a:{
    color:"#fff",
    "&:hover":{
      color:"#fff",
    }
  }
}));
const PostListOne = ({ post, role }) => {
  useEffect(() => {
    console.log(post);
  });
  const classes = useStyles();
  return (
    <Col lg="3" md="6" sm="12" className="mb-4">
      <Card small className="card-post card-post--1">
        <div
          className="card-post__image"
          style={{ backgroundImage: `url(${"https://picsum.photos/200/300"})` }}
        >
          <Badge
            pill
            className={`card-post__category bg-${"https://picsum.photos/200/300"}`}
          >
              {post.status}
          </Badge>
          <div className="card-post__author d-flex">
            <a
              href="#"
              className="card-post__author-avatar card-post__author-avatar--small"
              style={{
                backgroundImage: `url('${"https://picsum.photos/200/300"}')`,
              }}
            >
              Written by {post.end}
            </a>
          </div>
        </div>
        <CardBody>
          <h5 className="card-title">
            <a href="#" className="text-fiord-blue">
              {post.createAt}
            </a>
          </h5>
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted">{post.end}</span>
          </div>
        </CardBody>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<CloudDownloadIcon />}
        >
        <a className={classes.a} target="_blank" href={`${post.link}`} >{post.link2?"First File":"Your File"}</a>
        </Button>
        {post.link2?
        <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<CloudDownloadIcon />}
      >
      <a className={classes.a} target="_blank" href={`${post.link2}`} >Second File</a>
      </Button>:null}
      </Card>
    </Col>
  );
};

export default PostListOne;
