import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  routeStudent,
  routeAdmin,
  routeStaff,
  routeManager,
} from "./Routes/routes";
import withTracker from "./withTracker";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./Store/user/user.selector";
import { checkUserSession } from "./Store/user/user.action";
import Spinner from "./components/spinner/spinner.component";
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/enterpriseComp1640.min.css";
import Home from "./views/Home";
import { Container } from "./utils/toast";
const SignUp = lazy(() => import("./pages/user/sign-up/SignUp"));
const showMenuHome = (routes, currentUser) => {
  if (routes && routes.length > 0) {
    return routes.map((route, index) => {
      return currentUser? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={withTracker((props) => {
            return (
              <route.layout {...props}>
                <route.component {...props} />
              </route.layout>
            );
          })}
        />
      ) : (
        <Redirect key={index} to="/" />
      );
    });
  }
};
const showMenuAdmin =  (routes) => {
  if (routes && routes.length > 0) {
    return routes.map( (route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={withTracker((props) => {
            return (
              <route.layout {...props}>
                <route.component {...props} />
              </route.layout>
            );
          })}
        />
      )
    });
  }
};
const showMenuStaff = (routes) => {
  if (routes && routes.length > 0) {
    return  routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={(props) => {
            return (
              <route.layout {...props}>
                <route.component {...props} />
              </route.layout>
            );
          }}
        />
      )
    })
  }
};

const showMenuManager = (routes) => {
  if (routes && routes.length > 0) {
    return routes.map((route, index) => {
      return(
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={withTracker((props) => {
            return (
              <route.layout {...props}>
                <route.component {...props} />
              </route.layout>
            );
          })}
        />
      )
    });
  }
};

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
    const userProvider =  currentUser? currentUser.providerData[1]:null
    const identifiedManager =userProvider? (userProvider.role==="Manager"?true:false):null
    const identifiedStaff =userProvider?(userProvider.faulty):null
    const identifiedAdmin =userProvider?(userProvider.role==='Admin'?true:false):null
  return (
    <>
      <Switch>
        <ErrorBoundary>
          <Container />
          <Suspense fallback={<Spinner />}>
            {showMenuHome(routeStudent, currentUser)}
            {currentUser?(identifiedStaff ? showMenuStaff(routeStaff):(identifiedManager ? showMenuManager(routeManager):(identifiedAdmin ? showMenuAdmin(routeAdmin):<Redirect to='/' />))):<Redirect to='/' />}
            <Route
              exact
              path="/"
              render={() =>
                currentUser ? <Redirect to="/blog-posts" /> : <Home />
              }
            />
            <Route exact={true} path="/register" component={SignUp}></Route>
          </Suspense>
        </ErrorBoundary>
      </Switch>
      </>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
