import React from "react";
import {ErrorImageContainer,ErrorImageOverlay,ErrorImageText} from './error-boundary.styles'
class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
      errorInfo:null
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: error,
      errorInfo: errorInfo
    })
  }
  render() {
    if (this.state.hasError) {
      console.log(this.state.hasError)
      console.log(this.state.errorInfo)
      return (
      <ErrorImageOverlay>
                <ErrorImageContainer imageUrl='https://i.imgur.com/Q2BAOd2.png' />
                <ErrorImageText>This Page is Not on the Map</ErrorImageText>
      </ErrorImageOverlay>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
