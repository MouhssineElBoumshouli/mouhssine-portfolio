"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error }>;
  locale?: Locale;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const copy = getMessages(this.props.locale ?? "en").errorBoundary;
      const FallbackComponent = this.props.fallback;
      if (FallbackComponent) {
        return <FallbackComponent error={this.state.error} />;
      }

      return (
        <div className="bg-background text-foreground flex min-h-screen items-center justify-center p-6">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-semibold">
              {copy.title}
            </h2>
            <p className="text-muted-foreground mb-4">
              {copy.description}
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="bg-foreground text-background focus-visible:ring-ring rounded border px-4 py-2 outline-none hover:opacity-90 focus-visible:ring-2"
            >
              {copy.retry}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/** Root layouts persist during navigation; derive fallback language from the current route. */
export function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <ErrorBoundary locale={getLocaleFromPathname(pathname)}>
      {children}
    </ErrorBoundary>
  );
}
