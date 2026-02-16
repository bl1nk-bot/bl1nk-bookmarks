import type { ReactNode } from 'react'
import { MobileNav } from '@/components/layout/mobile-nav'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 text-slate-900 dark:from-[#0a0e1a] dark:via-[#101622] dark:to-[#1a1f35] dark:text-slate-100">
      <div className="mx-auto min-h-screen w-full max-w-7xl bg-gradient-to-br from-slate-50/50 via-blue-50/50 to-indigo-50/50 shadow-2xl backdrop-blur-sm dark:from-[#0a0e1a]/50 dark:via-[#101622]/50 dark:to-[#1a1f35]/50 lg:max-w-full xl:max-w-[1400px]">
        {children}
      </div>
      <MobileNav />
    </div>
  )
}
