import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, CheckCircle, Clock, Loader2 } from 'lucide-react'
import { useApi } from '@/hooks/use-api'

interface AsyncOperationProps {
  operation: () => Promise<void>
  successMessage?: string
  loadingMessage?: string
  errorMessage?: string
  children: React.ReactNode
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  className?: string
}

export function AsyncButton({
  operation,
  successMessage = 'Operation completed successfully',
  loadingMessage = 'Processing...',
  errorMessage = 'Operation failed',
  children,
  variant = 'default',
  size = 'default',
  disabled = false,
  className,
  ...props
}: AsyncOperationProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleClick = async () => {
    setStatus('loading')
    try {
      await operation()
      setStatus('success')
      setTimeout(() => setStatus('idle'), 2000) // Reset after 2 seconds
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000) // Reset after 3 seconds
    }
  }

  const getIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-4 w-4 animate-spin" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getText = () => {
    switch (status) {
      case 'loading':
        return loadingMessage
      case 'success':
        return successMessage
      case 'error':
        return errorMessage
      default:
        return children
    }
  }

  return (
    <Button
      variant={status === 'error' ? 'destructive' : variant}
      size={size}
      disabled={disabled || status === 'loading'}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {getIcon()}
      {getText()}
    </Button>
  )
}

interface DataFetcherProps<T> {
  url: string
  children: (data: T | null, loading: boolean, error: string | null, refetch: () => void) => React.ReactNode
  initialData?: T | null
  autoFetch?: boolean
}

export function DataFetcher<T = any>({
  url,
  children,
  initialData = null,
  autoFetch = true
}: DataFetcherProps<T>) {
  const { data, loading, error, get } = useApi<T>(url, {
    showToast: false // We'll handle UI feedback in the component
  })

  useEffect(() => {
    if (autoFetch) {
      get()
    }
  }, [autoFetch, get])

  return <>{children(data || initialData, loading, error, get)}</>
}

interface StatusIndicatorProps {
  status: 'idle' | 'loading' | 'success' | 'error'
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  customText?: {
    idle?: string
    loading?: string
    success?: string
    error?: string
  }
}

export function StatusIndicator({
  status,
  size = 'md',
  showText = false,
  customText = {}
}: StatusIndicatorProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }

  const getIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className={`${sizeClasses[size]} animate-spin`} />
      case 'success':
        return <CheckCircle className={`${sizeClasses[size]} text-green-600`} />
      case 'error':
        return <AlertCircle className={`${sizeClasses[size]} text-red-600`} />
      default:
        return <Clock className={`${sizeClasses[size]} text-gray-400`} />
    }
  }

  const getText = () => {
    if (!showText) return null

    const texts = {
      idle: customText.idle || 'Ready',
      loading: customText.loading || 'Loading...',
      success: customText.success || 'Success',
      error: customText.error || 'Error'
    }

    return <span className="ml-2 text-sm">{texts[status]}</span>
  }

  return (
    <div className="flex items-center">
      {getIcon()}
      {getText()}
    </div>
  )
}

interface AutoSaveInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onSave: (value: string) => Promise<void>
  delay?: number
  showStatus?: boolean
}

export function AutoSaveInput({
  value,
  onSave,
  delay = 1000,
  showStatus = true,
  ...props
}: AutoSaveInputProps) {
  const [localValue, setLocalValue] = useState(value)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    if (localValue === value) return

    const timeoutId = setTimeout(async () => {
      setStatus('saving')
      try {
        await onSave(localValue)
        setStatus('saved')
        setTimeout(() => setStatus('idle'), 2000)
      } catch (error) {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [localValue, value, onSave, delay])

  return (
    <div className="relative">
      <Input
        {...props}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className={status === 'error' ? 'border-red-500' : ''}
      />
      {showStatus && status !== 'idle' && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <StatusIndicator
            status={status === 'saving' ? 'loading' : status === 'saved' ? 'success' : 'error'}
            size="sm"
          />
        </div>
      )}
    </div>
  )
}

interface ConnectionStatusProps {
  isOnline?: boolean
  showText?: boolean
  className?: string
}

export function ConnectionStatus({
  isOnline = navigator.onLine,
  showText = true,
  className = ''
}: ConnectionStatusProps) {
  return (
    <Badge
      variant={isOnline ? 'default' : 'destructive'}
      className={`gap-1 ${className}`}
    >
      <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
      {showText && (isOnline ? 'Online' : 'Offline')}
    </Badge>
  )
}