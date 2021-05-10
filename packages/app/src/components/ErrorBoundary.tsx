import React, { ErrorInfo } from "react";

interface IProps {
  renderFallback: (error: Error) => React.ReactNode;
  children: React.ReactNode;
}

interface IStates {
  error: Error | null;
}

class ErrorBoundary extends React.PureComponent<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error) {
    return { error };
  }

  public render() {
    const { renderFallback } = this.props;
    const { error } = this.state;

    if (error) {
      return renderFallback(error);
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
