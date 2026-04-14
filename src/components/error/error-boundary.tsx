'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<ErrorFallbackProps>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorFallbackProps {
  error: Error | null
  errorInfo: React.ErrorInfo | null
  resetError: () => void
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError
}) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
    <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
    <h2 className="text-xl font-semibold text-foreground mb-2">
      Something went wrong
    </h2>
    <p className="text-muted-foreground mb-6 max-w-md">
      We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
    </p>
    {error && (
      <details className="mb-6 text-left bg-muted p-4 rounded-lg max-w-md w-full">
        <summary className="cursor-pointer font-medium mb-2">
          Error Details
        </summary>
        <pre className="text-xs text-muted-foreground overflow-auto">
          {error.message}
        </pre>
      </details>
    )}
    <Button onClick={resetError} className="gap-2">
      <RefreshCw className="h-4 w-4" />
      Try Again
    </Button>
  </div>
)

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo })

    // Log error to external service in production
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // In production, you might want to send this to an error reporting service
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } })
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          resetError={this.resetError}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary