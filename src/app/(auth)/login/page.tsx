'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { ArrowRight, BookMarked, Eye, EyeOff, Github, Lock, Mail } from 'lucide-react'
import { createClient, SUPABASE_MISSING_ENV_MESSAGE } from '@/lib/supabase/client'
import { useAuth } from '@/hooks/use-auth'

export default function LoginPage() {
  const { signIn, signInWithGoogle, isLoading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage(null)

    const result = await signIn(email, password)
    if (!result.success) setMessage(result.message)
  }

  const onGithubLogin = async () => {
    const supabase = createClient()
    if (!supabase) {
      setMessage(SUPABASE_MISSING_ENV_MESSAGE)
      return
    }

    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })

    if (signInError) setMessage(signInError.message)
  }

  return (
    <main className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-100 px-6 text-slate-900 dark:bg-[#101622] dark:text-white">
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <section className="relative z-10 flex h-full w-full max-w-[400px] flex-col">
        <div className="flex flex-1 flex-col items-center justify-end pb-8 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-blue-400 shadow-glow transition-transform duration-300 hover:scale-105">
            <BookMarked className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome Back</h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Log in to sync your bookmarks</p>
        </div>

        <form className="w-full space-y-5 pb-8" onSubmit={onSubmit}>
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Mail className="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-primary dark:text-slate-500" />
            </div>
            <input
              className="block w-full rounded-xl border border-slate-200 bg-white py-4 pl-11 pr-4 text-base text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-[#252f40] dark:bg-[#161e2c] dark:text-white dark:placeholder:text-slate-500"
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Lock className="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-primary dark:text-slate-500" />
            </div>
            <input
              className="block w-full rounded-xl border border-slate-200 bg-white py-4 pl-11 pr-12 text-base text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-[#252f40] dark:bg-[#161e2c] dark:text-white dark:placeholder:text-slate-500"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex justify-end">
            <Link className="text-sm font-medium text-slate-500 transition-colors hover:text-primary dark:text-slate-400" href="/login">
              Forgot Password?
            </Link>
          </div>

          {(message || error) && (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {message || error}
            </p>
          )}

          <button
            className="flex w-full items-center justify-center space-x-2 rounded-xl bg-primary py-4 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-blue-900/20"
            disabled={isLoading}
            type="submit"
          >
            <span>{isLoading ? 'Logging in...' : 'Log In'}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <div className="relative mb-8 w-full">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-surface-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-slate-100 px-3 text-xs font-medium uppercase tracking-wider text-slate-400 dark:bg-[#101622] dark:text-slate-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4">
          <button
            className="group flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition-colors hover:bg-slate-50 dark:border-[#252f40] dark:bg-[#161e2c] dark:hover:bg-[#252f40]/50"
            onClick={() => void signInWithGoogle()}
            type="button"
          >
            <span className="mr-3 h-5 w-5 rounded-full bg-[conic-gradient(from_0deg,_#ea4335_0_25%,_#fbbc05_25%_50%,_#34a853_50%_75%,_#4285f4_75%_100%)] transition-transform group-hover:scale-110" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Google</span>
          </button>
          <button
            className="group flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition-colors hover:bg-slate-50 dark:border-[#252f40] dark:bg-[#161e2c] dark:hover:bg-[#252f40]/50"
            onClick={() => void onGithubLogin()}
            type="button"
          >
            <Github className="mr-3 h-5 w-5 text-slate-900 transition-transform group-hover:scale-110 dark:text-white" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">GitHub</span>
          </button>
        </div>

        <div className="flex flex-1 items-end justify-center pb-8" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?
            <Link className="ml-1 font-semibold text-primary transition-colors hover:text-blue-400" href="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
