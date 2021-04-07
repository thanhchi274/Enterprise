import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  routeStudent,
  routeAdmin,
  routeStaff,
  routeManager,
  routeGuest
} from "./Routes/routes";
import withTracker from "./withTracker";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./Store/user/user.selector";
import { checkUserSession } from "./Store/user/user.action";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import SignInPage from "./pages/user/sign-in/SignIn";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import StaffList from "./staff.json";
import AdminList from "./admin.json";
import _ from "lodash";
//Toast
import { Container } from "./utils/toast";

const SignUp = lazy(() => import("./pages/user/sign-up/SignUp"));
const showMenuHome = (routes, currentUser) => {
  if (routes && routes.length > 0) {
    return routes.map((route, index) => {
      return currentUser !== null ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={ withTracker(props => {
            return (
              <route.layout {...props}>
                <route.component {...props} />
              </route.layout>
            );
          })}
        />
      ) : (
        <Redirect
        key={index}
        to="/"
      />
      );
    });
  }
};
const showMenuAdmin = (routes, currentUser) => {
  if (routes && routes.length > 0) {
    return routes.map((route, index) => {
      return currentUser && AdminList.includes(currentUser.email) === true ? (
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
        <Redirect
        key={index}
        to="/"
      />
      );
    });
  }
};
const showMenuStaff = (routes, currentUser) => {
  if (routes && routes.length > 0) {
    return routes.map((route, index) => {
      return currentUser && StaffList.includes(currentUser.email) === true ? (
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
        <Redirect
        key={index}
        to="/"
      />
      );
    });
  }
};

const showMenuManager = (routes, currentUser) => {
  if (routes && routes.length > 0) {
    return routes.map((route, index) => {
      return currentUser && StaffList.includes(currentUser.email) === true ? (
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
        <Redirect
        key={index}
        to="/"
      />
      );
    });
  }
};

const showMenuGuest = (routes, currentUser) => {
  if (routes && routes.length > 0) {
    return routes.map((route, index) => {
      return currentUser ? (
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
        <Route
        exact
        key={index}
        path="/"
        render={() =>
          <SignInPage />
        }
      />
      );
    });
  }
};

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <>
      <Switch>
        <ErrorBoundary>
          <Container />
          <Suspense fallback={<Spinner />}>
            {showMenuHome(routeStudent, currentUser)}
            {showMenuAdmin(routeAdmin, currentUser)}
            {showMenuStaff(routeStaff, currentUser)}
            {showMenuManager(routeManager, currentUser)}
            {showMenuGuest(routeGuest, currentUser)}
            <Route
              exact
              path="/"
              render={() =>
                currentUser ? <Redirect to="/blog-posts" /> : <SignInPage />
              }
            />            {/* <Route path="*" component={() => "404 NOT FOUND"} />
             <Route path="*" component={() => "404 NOT FOUND"} /> */}
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
