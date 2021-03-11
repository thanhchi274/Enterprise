import React from "react";
import { Route } from "react-router-dom";
import ErrorBoundary from '../../components/error-boundary/error-boundary.component'
// import 'material-react-toastify/dist/ReactToastify.css';
// import {isWindows, MobileView} from "react-device-detect";
const HomeLayout = props => {
  return (
    <div>
    <ErrorBoundary>
      {/* <Header /> */}
      <div className="main-template">
      {props.children}
      </div>
      {/* <MobileView>
              <BottomNavBar />
      </MobileView>
      <ToastContainer position="top-center"
          limit={3}
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          transition={Slide}
          pauseOnHover /> */}
      </ErrorBoundary>
    </div>
  );
};
const HomeTemplate=({ Component, component, ...props }) =>{
  return (
    <>
    <Route
      {...props}
      render={propsComponent => (
        <HomeLayout>
          <Component {...propsComponent} />
        </HomeLayout>
      )}
    />
    </>
  );
}
export default HomeTemplate
