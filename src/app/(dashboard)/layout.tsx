import type { ReactNode } from 'react'
import { MobileNav } from '@/components/layout/mobile-nav'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 dark:text-slate-100">
      <div className="mx-auto min-h-screen w-full max-w-[1400px] bg-gradient-to-br from-indigo-50/50 via-white/50 to-purple-50/50 shadow-2xl backdrop-blur-sm dark:from-slate-950/50 dark:via-slate-900/50 dark:to-indigo-950/50">
        {children}
      </div>
      <MobileNav />
    </div>
  )
}
