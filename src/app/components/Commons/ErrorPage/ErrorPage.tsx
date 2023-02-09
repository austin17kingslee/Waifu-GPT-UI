import React, { Component } from 'react';

export default class ErrorPage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="error-page">
        <h1>Something went wrong.</h1>
      </div>
    );
  }
}
