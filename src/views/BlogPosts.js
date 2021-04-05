/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState, useEffect } from "react";
import { Container, Row } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import PostListOne from "../components/user/post/PostListOne";
import PostListTwo from "../components/user/post/PostListTwo";
import backgroundImage from "../assets/images/content-management/1.jpeg";
import authorAvatar from "../assets/images/avatars/1.jpg";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchMagazinePostStart } from "../Store/data/data.action";
import {selectMagazinePost} from '../Store/data/data.selector'
const BlogPosts = ({ fetchMagazinePostStart,data }) => {
  useEffect(() => {
    fetchMagazinePostStart();
  }, [fetchMagazinePostStart]);
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Magazine"
          subtitle="Your Post"
          className="text-sm-left"
        />
      </Row>
      <Row>
        {data
          ? data.map((post, idx) => (
              <PostListOne post={post} key={idx} />
            ))
          : null}
      </Row>
    </Container>
  );
};
const mapStateToProps = createStructuredSelector({
  data:selectMagazinePost
});
const mapDispatchToProps = {
  fetchMagazinePostStart: (data) => fetchMagazinePostStart(data),
};
export default connect(mapStateToProps, mapDispatchToProps)(BlogPosts);
