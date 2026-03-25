import * as React from "react";

export interface MediaErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode | ((error: Error) => React.ReactNode);
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface MediaErrorBoundaryState {
  error: Error | null;
}

export class MediaErrorBoundary extends React.Component<
  MediaErrorBoundaryProps,
  MediaErrorBoundaryState
> {
  constructor(props: MediaErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): MediaErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.error) {
      const { fallback } = this.props;

      if (typeof fallback === "function") {
        return fallback(this.state.error);
      }

      return fallback ?? null;
    }

    return this.props.children;
  }
}
