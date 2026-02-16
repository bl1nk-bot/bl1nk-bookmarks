'use client'

import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LogOut, User, Settings, BookMarked, Sparkles, Bell, Search, Plus, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  const { user, signOut, isLoading } = useAuth()

  const getInitials = (email: string) => {
    return email
      .split('@')[0]
      .substring(0, 2)
      .toUpperCase()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/80">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Section - Logo & Brand */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="group flex items-center gap-2.5">
            <div className="relative">
              <div className="absolute -inset-0.5 animate-glow rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-50 blur-md transition duration-500 group-hover:opacity-75" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <BookMarked className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-lg font-extrabold tracking-tight text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
                bl1nk
              </h1>
            </div>
          </Link>
        </div>

        {/* Center Section - Quick Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/dashboard/search">
            <button className="group flex items-center gap-2 rounded-xl border border-slate-200/50 bg-slate-50/50 px-4 py-2 text-sm text-slate-500 transition-all duration-300 hover:border-blue-300 hover:bg-white hover:text-slate-900 hover:shadow-lg dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:border-blue-600 dark:hover:bg-slate-800 dark:hover:text-white">
              <Search className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-medium">Search...</span>
              <kbd className="pointer-events-none ml-4 hidden h-5 select-none items-center gap-1 rounded border border-slate-200 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-400 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </Link>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Add Button */}
          <Link href="/dashboard">
            <button className="group relative hidden sm:flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Plus className="relative h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
              <span className="relative">Add</span>
            </button>
          </Link>

          {/* Notifications */}
          <button className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/50 bg-slate-50/50 text-slate-500 transition-all duration-300 hover:border-blue-300 hover:bg-white hover:text-blue-600 hover:shadow-lg dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:border-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400">
            <Bell className="h-5 w-5 transition-transform duration-300 group-hover:animate-bounce-subtle" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-[10px] font-bold text-white shadow-lg">
              3
            </span>
          </button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="group flex items-center gap-2 rounded-xl border border-slate-200/50 bg-slate-50/50 p-1.5 pr-3 transition-all duration-300 hover:border-blue-300 hover:bg-white hover:shadow-lg dark:border-slate-700/50 dark:bg-slate-800/50 dark:hover:border-blue-600 dark:hover:bg-slate-800">
                <Avatar className="h-8 w-8 ring-2 ring-white dark:ring-slate-700">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-xs font-bold text-white">
                    {user?.email ? getInitials(user.email) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-300 group-hover:rotate-180" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-72 rounded-2xl border-slate-200/50 bg-white/95 p-2 shadow-2xl backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/95" 
              align="end"
            >
              <DropdownMenuLabel className="rounded-xl px-3 py-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 ring-2 ring-blue-500/20 dark:ring-blue-400/20">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-sm font-bold text-white">
                      {user?.email ? getInitials(user.email) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">My Account</p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-1 bg-slate-100 dark:bg-slate-800" />
              
              <DropdownMenuItem className="group my-1 cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 dark:text-slate-300 dark:hover:from-blue-950 dark:hover:to-purple-950 dark:hover:text-blue-400">
                <User className="mr-3 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                <span>Profile</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="group my-1 cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 dark:text-slate-300 dark:hover:from-blue-950 dark:hover:to-purple-950 dark:hover:text-blue-400">
                <Settings className="mr-3 h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                <span>Settings</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="my-1 bg-slate-100 dark:bg-slate-800" />
              
              <DropdownMenuItem
                className="group my-1 cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 transition-all duration-300 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 dark:text-rose-400 dark:hover:from-rose-950 dark:hover:to-pink-950"
                onClick={() => void signOut()}
                disabled={isLoading}
              >
                <LogOut className="mr-3 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                <span>{isLoading ? 'Signing out...' : 'Sign out'}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
