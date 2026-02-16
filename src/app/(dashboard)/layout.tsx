import type { ReactNode } from 'react'
import { MobileNav } from '@/components/layout/mobile-nav'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f6f8] text-slate-900 dark:bg-[#101622] dark:text-slate-100">
      <div className="mx-auto min-h-screen w-full max-w-md bg-[#f6f6f8] shadow-2xl dark:bg-[#101622]">
        {children}
      </div>
      <MobileNav />
    </div>
  )
}
