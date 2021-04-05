/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, {useState} from "react";
import { Container, Row } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import PostListOne from "../components/user/post/PostListOne";
import PostListTwo from "../components/user/post/PostListTwo";
import backgroundImage from "../assets/images/content-management/1.jpeg";
import authorAvatar from "../assets/images/avatars/1.jpg";
const BlogPosts = ()=> {
  const [PostsListOne, setPostListOne] = useState( [
    {
      backgroundImage,
      category: "Approved",
      categoryTheme: "dark",
      author: "Anna Kunis",
      authorAvatar,
      title: "COMP1111",
      body:
        "However venture pursuit he am mr cordial. Forming musical am hearing studied be luckily. But in for determine what would see...",
      date: "28 February 2021",
      endDate:"30 February 2021"
    },
    {
      backgroundImage,
      category: "Approved",
      categoryTheme: "info",
      author: "James Jamerson",
      authorAvatar,
      title: "COMP1112",
      body:
        "Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking learning my...",
      date: "29 February 2021",
      endDate:"30 February 2021"
    },
    {
      backgroundImage,
      category: "Denied",
      categoryTheme: "royal-blue",
      author: "Jimmy Jackson",
      authorAvatar,
      title: "COMP1113",
      body:
        "Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking learning my...",
      date: "29 February 2021",
      endDate:"30 February 2021"
    },
    {
      backgroundImage,
      category: "Approved",
      categoryTheme: "warning",
      author: "John James",
      authorAvatar,
      title: "COMP1114",
      body:
        "How but sons mrs lady when. Her especially are unpleasant out alteration continuing unreserved ready road market resolution...",
      date: "29 February 2021",
      endDate:"30 February 2021"
    }
  ])
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
          {PostsListOne?PostsListOne.map((post, idx) => (
            <PostListOne post={post} key={idx} />
          )):null}
        </Row>
      </Container>
    );
  }

export default BlogPosts;
