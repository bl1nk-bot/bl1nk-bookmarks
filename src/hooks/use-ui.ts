'use client'

import { useEffect, useCallback, useRef, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

// Keyboard navigation hook
export function useKeyboardNavigation() {
  const router = useRouter()

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Global keyboard shortcuts
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case '/':
          event.preventDefault()
          // Focus search input
          const searchInput = document.querySelector('[data-search-input]') as HTMLInputElement
          searchInput?.focus()
          break
        case 'n':
          event.preventDefault()
          // Open new bookmark dialog
          const newBookmarkBtn = document.querySelector('[data-new-bookmark]') as HTMLButtonElement
          newBookmarkBtn?.click()
          break
        case 'k':
          event.preventDefault()
          // Open command palette (if implemented)
          break
      }
    }

    // Escape key handling
    if (event.key === 'Escape') {
      // Close modals, dialogs, etc.
      const openDialog = document.querySelector('[role="dialog"][aria-modal="true"]')
      if (openDialog) {
        const closeBtn = openDialog.querySelector('[data-close]') as HTMLButtonElement
        closeBtn?.click()
      }
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

// Focus trap hook for modals
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    firstElement?.focus()

    return () => document.removeEventListener('keydown', handleTabKey)
  }, [isActive])

  return containerRef
}

// Responsive breakpoint hook
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width < 640) {
        setBreakpoint('mobile')
      } else if (width < 1024) {
        setBreakpoint('tablet')
      } else {
        setBreakpoint('desktop')
      }
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return breakpoint
}

// Intersection observer hook for lazy loading
export function useIntersectionObserver(
  callback: () => void,
  options: IntersectionObserverInit = {}
) {
  const targetRef = useRef<Element | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback()
      }
    }, options)

    if (targetRef.current) {
      observer.observe(targetRef.current)
    }

    return () => observer.disconnect()
  }, [callback, options])

  return targetRef
}

// Performance monitoring hook
export function usePerformanceMonitor(name: string) {
  const startTimeRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    startTimeRef.current = performance.now()
  }, [])

  useEffect(() => {
    return () => {
      if (startTimeRef.current) {
        const duration = performance.now() - startTimeRef.current
        console.log(`${name} took ${duration.toFixed(2)}ms`)

        // Send to analytics if needed
        // analytics.track('performance', { name, duration })
      }
    }
  }, [name])
}

// Debounce hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Local storage hook with SSR safety
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setValue]
}

// Theme hook
export function useTheme() {
  const [theme, setTheme] = useLocalStorage('theme', 'system' as 'light' | 'dark' | 'system')

  const resolvedTheme = useMemo(() => {
    if (theme === 'system') {
      return typeof window !== 'undefined' &&
             window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    return theme
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(resolvedTheme)
  }, [resolvedTheme])

  return { theme, resolvedTheme, setTheme }
}

// Online status hook
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}