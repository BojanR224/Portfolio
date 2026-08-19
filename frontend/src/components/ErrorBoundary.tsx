import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/** Catches render errors anywhere below it — no route ever blanks out. */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('UI error caught by boundary:', error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-start justify-center px-6">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            Something broke
          </p>
          <h1 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">
            This page took a wrong turn.
          </h1>
          <p className="mt-4 leading-relaxed text-soft">
            An unexpected error occurred while rendering. The rest of the site should still
            work.
          </p>
          <a
            href="/"
            className="mt-8 border border-line px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] transition-colors hover:border-accent hover:text-accent"
          >
            Back to the homepage
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}