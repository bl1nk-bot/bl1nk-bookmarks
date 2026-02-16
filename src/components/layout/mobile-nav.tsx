'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FolderOpen, Grid3X3, Search, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '/dashboard', icon: Grid3X3 },
  { label: 'Search', href: '/dashboard/search', icon: Search },
  { label: 'Collections', href: '/dashboard/collections', icon: FolderOpen },
  { label: 'Profile', href: '/login', icon: User },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 mx-auto h-20 w-full max-w-md border-t border-slate-200 bg-white/90 px-4 pt-3 backdrop-blur-lg dark:border-slate-800/50 dark:bg-[#101622]/90"
      style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-start justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = item.href === '/dashboard'
            ? pathname === '/dashboard'
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex w-16 cursor-pointer flex-col items-center gap-1"
            >
              {active ? (
                <div className="rounded-full bg-primary/10 px-4 py-1 dark:bg-primary/20">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              ) : (
                <Icon className="h-6 w-6 text-slate-400 transition-colors group-hover:text-slate-600 dark:group-hover:text-slate-200" />
              )}
              <span
                className={cn(
                  'text-[10px] font-medium',
                  active ? 'text-primary' : 'text-slate-400'
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
