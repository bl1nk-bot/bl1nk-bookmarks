'use client'

import { useBreakpoint, useFocusTrap } from '@/hooks/use-ui'
import { cn } from '@/lib/utils'

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full'
}

const paddingClasses = {
  none: '',
  sm: 'px-4 py-2',
  md: 'px-6 py-4',
  lg: 'px-8 py-6'
}

export function ResponsiveContainer({
  children,
  className,
  maxWidth = 'full',
  padding = 'md'
}: ResponsiveContainerProps) {
  return (
    <div
      className={cn(
        'w-full mx-auto',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  )
}

interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  gap?: 'sm' | 'md' | 'lg'
}

const gapClasses = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6'
}

export function ResponsiveGrid({
  children,
  className,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md'
}: ResponsiveGridProps) {
  const breakpoint = useBreakpoint()

  const getGridCols = () => {
    switch (breakpoint) {
      case 'mobile':
        return cols.mobile || 1
      case 'tablet':
        return cols.tablet || cols.mobile || 2
      case 'desktop':
        return cols.desktop || cols.tablet || cols.mobile || 3
      default:
        return 3
    }
  }

  return (
    <div
      className={cn(
        'grid',
        `grid-cols-${getGridCols()}`,
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  )
}

interface ResponsiveFlexProps {
  children: React.ReactNode
  className?: string
  direction?: 'row' | 'col'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  gap?: 'sm' | 'md' | 'lg'
  wrap?: boolean
}

const alignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch'
}

const justifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly'
}

export function ResponsiveFlex({
  children,
  className,
  direction = 'row',
  align = 'center',
  justify = 'start',
  gap = 'md',
  wrap = false
}: ResponsiveFlexProps) {
  return (
    <div
      className={cn(
        'flex',
        direction === 'col' ? 'flex-col' : 'flex-row',
        alignClasses[align],
        justifyClasses[justify],
        gapClasses[gap],
        wrap && 'flex-wrap',
        className
      )}
    >
      {children}
    </div>
  )
}

interface ResponsiveTextProps {
  children: React.ReactNode
  className?: string
  size?: {
    mobile?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
    tablet?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
    desktop?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
  }
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
}

const textSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl'
}

const weightClasses = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
}

export function ResponsiveText({
  children,
  className,
  size = { mobile: 'base', tablet: 'base', desktop: 'base' },
  weight = 'normal'
}: ResponsiveTextProps) {
  const breakpoint = useBreakpoint()

  const getTextSize = () => {
    switch (breakpoint) {
      case 'mobile':
        return size.mobile || 'base'
      case 'tablet':
        return size.tablet || size.mobile || 'base'
      case 'desktop':
        return size.desktop || size.tablet || size.mobile || 'base'
      default:
        return 'base'
    }
  }

  return (
    <span
      className={cn(
        textSizeClasses[getTextSize()],
        weightClasses[weight],
        className
      )}
    >
      {children}
    </span>
  )
}

interface ResponsiveHideProps {
  children: React.ReactNode
  hideOn?: ('mobile' | 'tablet' | 'desktop')[]
  showOn?: ('mobile' | 'tablet' | 'desktop')[]
}

export function ResponsiveHide({
  children,
  hideOn = [],
  showOn = []
}: ResponsiveHideProps) {
  const breakpoint = useBreakpoint()

  const shouldHide = hideOn.includes(breakpoint)
  const shouldShow = showOn.length === 0 || showOn.includes(breakpoint)

  if (shouldHide || !shouldShow) {
    return null
  }

  return <>{children}</>
}

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  position?: 'left' | 'right' | 'top' | 'bottom'
  size?: 'sm' | 'md' | 'lg' | 'full'
  className?: string
}

const positionClasses = {
  left: 'left-0 top-0 h-full',
  right: 'right-0 top-0 h-full',
  top: 'top-0 left-0 w-full',
  bottom: 'bottom-0 left-0 w-full'
}

const sizeClasses = {
  sm: {
    left: 'w-64',
    right: 'w-64',
    top: 'h-64',
    bottom: 'h-64'
  },
  md: {
    left: 'w-80',
    right: 'w-80',
    top: 'h-80',
    bottom: 'h-80'
  },
  lg: {
    left: 'w-96',
    right: 'w-96',
    top: 'h-96',
    bottom: 'h-96'
  },
  full: {
    left: 'w-full',
    right: 'w-full',
    top: 'h-full',
    bottom: 'h-full'
  }
}

export function Drawer({
  isOpen,
  onClose,
  children,
  position = 'right',
  size = 'md',
  className
}: DrawerProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'fixed z-50 bg-background border transition-transform duration-300 ease-in-out',
          positionClasses[position],
          sizeClasses[size][position],
          isOpen ? 'translate-x-0 translate-y-0' : getClosedTransform(position),
          className
        )}
      >
        {children}
      </div>
    </>
  )
}

function getClosedTransform(position: 'left' | 'right' | 'top' | 'bottom') {
  switch (position) {
    case 'left':
      return '-translate-x-full'
    case 'right':
      return 'translate-x-full'
    case 'top':
      return '-translate-y-full'
    case 'bottom':
      return 'translate-y-full'
  }
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const modalSizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl'
}

export function Modal({
  isOpen,
  onClose,
  children,
  size = 'md',
  className
}: ModalProps) {
  const modalRef = useFocusTrap(isOpen)

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          ref={modalRef as any}
          className={cn(
            'bg-background border rounded-lg shadow-lg w-full',
            modalSizeClasses[size],
            className
          )}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          {children}
        </div>
      </div>
    </>
  )
}