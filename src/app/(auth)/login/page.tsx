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
    <main className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-6 text-slate-900 dark:from-[#0a0e1a] dark:via-[#101622] dark:to-[#1a1f35] dark:text-white">
      {/* Animated background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-10%] h-[500px] w-[500px] -translate-x-1/2 animate-glow rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-30 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] animate-float rounded-full bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 opacity-20 blur-[120px]" />
        <div className="absolute left-[-10%] top-[30%] h-[300px] w-[300px] animate-float rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-15 blur-[100px]" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Dot pattern overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.015] dark:opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <section className="relative z-10 flex h-full w-full max-w-[440px] flex-col">
        {/* Logo & Header */}
        <div className="flex flex-1 flex-col items-center justify-end pb-10 text-center">
          <div className="group relative mb-8">
            <div className="absolute -inset-2 animate-glow rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-70 blur-xl transition duration-1000 group-hover:opacity-100" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/30 transition-transform duration-500 hover:scale-110">
              <BookMarked className="h-12 w-12 text-white" />
              <Sparkles className="absolute -right-2 -top-2 h-6 w-6 animate-pulse text-yellow-300 drop-shadow-lg" />
            </div>
          </div>
          
          <h1 className="mb-3 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-5xl font-black tracking-tight text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
            Welcome Back
          </h1>
          <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
            Continue your bookmark journey ✨
          </p>
        </div>

        {/* Form */}
        <form className="w-full space-y-5 pb-8" onSubmit={onSubmit}>
          {/* Email Input */}
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
              <Mail className="h-5 w-5 text-slate-400 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-blue-500 dark:text-slate-500" />
            </div>
            <input
              className="block w-full rounded-2xl border-2 border-slate-200/60 bg-white/90 py-4.5 pl-14 pr-5 text-base text-slate-900 shadow-xl shadow-slate-200/30 backdrop-blur-sm transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/15 dark:border-slate-700/50 dark:bg-slate-800/70 dark:text-white dark:shadow-slate-900/30 dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-blue-400 dark:focus:bg-slate-800"
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
              <Lock className="h-5 w-5 text-slate-400 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-blue-500 dark:text-slate-500" />
            </div>
            <input
              className="block w-full rounded-2xl border-2 border-slate-200/60 bg-white/90 py-4.5 pl-14 pr-14 text-base text-slate-900 shadow-xl shadow-slate-200/30 backdrop-blur-sm transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/15 dark:border-slate-700/50 dark:bg-slate-800/70 dark:text-white dark:shadow-slate-900/30 dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-blue-400 dark:focus:bg-slate-800"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-5 text-slate-400 transition-all duration-300 hover:scale-110 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link className="text-sm font-semibold text-slate-500 transition-all duration-300 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400" href="/login">
              Forgot Password?
            </Link>
          </div>

          {/* Error Message */}
          {(message || error) && (
            <div className="animate-in slide-in-from-top-2 rounded-2xl border-2 border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 px-5 py-4 text-sm font-medium text-rose-700 shadow-lg dark:border-rose-800/50 dark:from-rose-950/50 dark:to-pink-950/50 dark:text-rose-300">
              {message || error}
            </div>
          )}

          {/* Submit Button */}
          <button
            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-4.5 text-base font-bold text-white shadow-2xl shadow-purple-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isLoading}
            type="submit"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">{isLoading ? 'Logging in...' : 'Log In'}</span>
            <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative mb-8 w-full">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-slate-200/60 dark:border-slate-700/50" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-5 text-xs font-bold uppercase tracking-widest text-slate-400 dark:from-[#0a0e1a] dark:via-[#101622] dark:to-[#1a1f35] dark:text-slate-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <button
            className="group relative overflow-hidden rounded-2xl border-2 border-slate-200/60 bg-white/90 px-5 py-4.5 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-slate-300 hover:shadow-2xl active:scale-[0.98] dark:border-slate-700/50 dark:bg-slate-800/70 dark:hover:border-slate-600"
            onClick={() => void signInWithGoogle()}
            type="button"
          >
            <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent to-slate-50/50 transition-transform duration-300 group-hover:translate-y-0 dark:to-slate-800/50" />
            <div className="relative flex items-center justify-center gap-3">
              <span className="h-6 w-6 rounded-full bg-[conic-gradient(from_0deg,_#ea4335_0_25%,_#fbbc05_25%_50%,_#34a853_50%_75%,_#4285f4_75%_100%)] shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Google</span>
            </div>
          </button>
          
          <button
            className="group relative overflow-hidden rounded-2xl border-2 border-slate-200/60 bg-white/90 px-5 py-4.5 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-slate-300 hover:shadow-2xl active:scale-[0.98] dark:border-slate-700/50 dark:bg-slate-800/70 dark:hover:border-slate-600"
            onClick={() => void onGithubLogin()}
            type="button"
          >
            <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent to-slate-50/50 transition-transform duration-300 group-hover:translate-y-0 dark:to-slate-800/50" />
            <div className="relative flex items-center justify-center gap-3">
              <Github className="h-6 w-6 text-slate-900 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 dark:text-white" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">GitHub</span>
            </div>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="flex flex-1 items-end justify-center pb-10" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?
            <Link className="ml-2 font-bold text-blue-600 transition-all duration-300 hover:text-purple-600 dark:text-blue-400 dark:hover:text-purple-400" href="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
