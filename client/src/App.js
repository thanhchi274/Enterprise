import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { routeHome, routeAdminStaff } from "./Routes/routes";
import HomeTemplate from "./Template/User/UserTemplate.jsx";
import withTracker from "./withTracker";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./Store/user/user.selector";
// import {checkUserSession} from './Store/user/user.action'
// import Spinner from './components/spinner/spinner.component'
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import SignInPage from "./pages/user/sign-in/SignIn";
import "./App.scss"
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

// const SignUp = lazy(()=>import('./pages/sign-up/SignUp'))
const showMenuHome = (routes) => {
  if (routes && routes.length > 0) {
    return routes.map((route, index) => {
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
      );
    });
  }
};
const showMenuAdminStaff = (routes) => {
  if (routes && routes.length > 0) {
    return routes.map((item, index) => {
      return <HomeTemplate key={index} {...item} Component={item.Component} />;
    });
  }
};
const App = ({
  // checkUserSession,
  currentUser,
}) => {
  // useEffect(()=>{
  //   checkUserSession()
  // },[checkUserSession])
  console.log(currentUser);
  return (
    <>
      {/* <GlobalStyles/> */}
      <Switch>
        <ErrorBoundary>
          {/* <Suspense fallback={<Spinner />}> */}
          {showMenuHome(routeHome)}
          {showMenuAdminStaff(routeAdminStaff)}
          <Route
            exact
            path="/sign-in"
            render={() => (currentUser ? <Redirect to="/" /> : <SignInPage />)}
          />
          {/* <Route exact={true} path='/register' component={SignUp} ></Route> */}

          {/* </Suspense> */}
        </ErrorBoundary>
      </Switch>
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
// const mapDispatchToProps = dispatch=>({
//   checkUserSession: ()=>dispatch(checkUserSession())
// })
export default connect(mapStateToProps, null)(App);
