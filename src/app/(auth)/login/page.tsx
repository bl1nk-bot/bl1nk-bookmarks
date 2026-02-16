'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { ArrowRight, BookMarked, Eye, EyeOff, Github, Lock, Mail, Sparkles } from 'lucide-react'
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
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 text-slate-900 dark:from-[#0a0e1a] dark:via-[#101622] dark:to-[#1a1f35] dark:text-white sm:px-6">
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[300px] w-[300px] -translate-x-1/2 animate-glow rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-30 blur-[120px] sm:h-[400px] sm:w-[400px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[200px] w-[200px] animate-float rounded-full bg-gradient-to-r from-pink-400 to-orange-400 opacity-20 blur-[100px] sm:h-[300px] sm:w-[300px]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <section className="relative z-10 flex h-full w-full max-w-[420px] flex-col py-8 sm:py-0">
        <div className="flex flex-1 flex-col items-center justify-end pb-6 text-center sm:pb-8">
          <div className="group relative mb-5 sm:mb-6">
            <div className="absolute -inset-1 animate-glow rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-75 blur-lg transition duration-1000 group-hover:opacity-100" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl transition-transform duration-300 hover:scale-110 sm:h-20 sm:w-20">
              <BookMarked className="h-8 w-8 text-white sm:h-10 sm:w-10" />
              <Sparkles className="absolute -right-1 -top-1 h-4 w-4 animate-pulse text-yellow-300 sm:h-5 sm:w-5" />
            </div>
          </div>
          <h1 className="mb-2 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200 sm:mb-3 sm:text-4xl">Welcome Back</h1>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 sm:text-base">Continue your bookmark journey ✨</p>
        </div>

        <form className="w-full space-y-4 pb-6 sm:space-y-5 sm:pb-8" onSubmit={onSubmit}>
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Mail className="h-5 w-5 text-slate-400 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-blue-500 dark:text-slate-500" />
            </div>
            <input
              className="block w-full rounded-2xl border-2 border-slate-200/50 bg-white/80 py-4 pl-12 pr-4 text-base text-slate-900 shadow-lg shadow-slate-200/50 backdrop-blur-sm transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-white dark:shadow-slate-900/50 dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-blue-400 dark:focus:bg-slate-800"
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Lock className="h-5 w-5 text-slate-400 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-blue-500 dark:text-slate-500" />
            </div>
            <input
              className="block w-full rounded-2xl border-2 border-slate-200/50 bg-white/80 py-4 pl-12 pr-12 text-base text-slate-900 shadow-lg shadow-slate-200/50 backdrop-blur-sm transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-white dark:shadow-slate-900/50 dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-blue-400 dark:focus:bg-slate-800"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-all duration-300 hover:scale-110 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex justify-end">
            <Link className="text-sm font-semibold text-slate-600 transition-all duration-300 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400" href="/login">
              Forgot Password?
            </Link>
          </div>

          {(message || error) && (
            <div className="animate-in slide-in-from-top-2 rounded-2xl border-2 border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 px-4 py-3 text-sm font-medium text-rose-700 shadow-lg dark:border-rose-800 dark:from-rose-950 dark:to-pink-950 dark:text-rose-300">
              {message || error}
            </div>
          )}

          <button
            className="group relative flex w-full items-center justify-center space-x-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-4 font-bold text-white shadow-2xl shadow-blue-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/60 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-blue-900/30"
            disabled={isLoading}
            type="submit"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">{isLoading ? 'Logging in...' : 'Log In'}</span>
            <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>

        <div className="relative mb-8 w-full">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-slate-200 dark:border-slate-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 text-xs font-bold uppercase tracking-widest text-slate-500 dark:from-[#0a0e1a] dark:via-[#101622] dark:to-[#1a1f35] dark:text-slate-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4">
          <button
            className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white/80 px-4 py-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-slate-300 hover:shadow-xl active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
            onClick={() => void signInWithGoogle()}
            type="button"
          >
            <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent to-slate-50 transition-transform duration-300 group-hover:translate-y-0 dark:to-slate-800" />
            <div className="relative flex items-center justify-center">
              <span className="mr-3 h-6 w-6 rounded-full bg-[conic-gradient(from_0deg,_#ea4335_0_25%,_#fbbc05_25%_50%,_#34a853_50%_75%,_#4285f4_75%_100%)] shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Google</span>
            </div>
          </button>
          <button
            className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white/80 px-4 py-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-slate-300 hover:shadow-xl active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
            onClick={() => void onGithubLogin()}
            type="button"
          >
            <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent to-slate-50 transition-transform duration-300 group-hover:translate-y-0 dark:to-slate-800" />
            <div className="relative flex items-center justify-center">
              <Github className="mr-3 h-6 w-6 text-slate-900 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 dark:text-white" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">GitHub</span>
            </div>
          </button>
        </div>

        <div className="flex flex-1 items-end justify-center pb-8" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Don&apos;t have an account?
            <Link className="ml-1 font-bold text-blue-600 transition-all duration-300 hover:text-purple-600 dark:text-blue-400 dark:hover:text-purple-400" href="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
