import React from "react";
import { Container, Row, Col } from "shards-react";
import ReportList from "../components/guest/home/ReportList";
import Login from "../components/guest/home/Login";
import SignUp from "../components/guest/home/SignUp";

const Home = () => {
  const [loginOrSignUp, setLoginOrSignUp] = React.useState("login");
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4"></Row>
      <Row>
        <Col lg="8" md="8" sm="12" className="mb-4">
          {loginOrSignUp === "login" ? (
            <Login setLoginOrSignUp={setLoginOrSignUp} />
          ) : (
            <SignUp setLoginOrSignUp={setLoginOrSignUp} />
          )}
        </Col>
        <Col lg="4" md="4" sm="12" className="mb-4">
          <ReportList />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
