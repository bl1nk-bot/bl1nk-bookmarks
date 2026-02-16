'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { BookMarked, Eye, EyeOff, Github, Lock, Mail, User, Sparkles } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { createClient, SUPABASE_MISSING_ENV_MESSAGE } from '@/lib/supabase/client'

export default function SignupPage() {
  const { signUp, signInWithGoogle, isLoading, error } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage(null)

    if (password.length < 8) {
      setMessage('Password must be at least 8 characters')
      return
    }

    if (!acceptedTerms) {
      setMessage('Please accept the Terms and Privacy Policy')
      return
    }

    const result = await signUp(email, password)
    if (result.success && fullName.trim()) {
      setMessage(`${result.message} Welcome, ${fullName.trim()}!`)
    } else {
      setMessage(result.message)
    }
  }

  const onGithubSignup = async () => {
    const supabase = createClient()
    if (!supabase) {
      setMessage(SUPABASE_MISSING_ENV_MESSAGE)
      return
    }

    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (signInError) {
      setMessage(signInError.message)
    }
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 p-4 text-gray-900 transition-colors duration-300 dark:from-[#0a0e1a] dark:via-[#101622] dark:to-[#1a1535] dark:text-gray-100 sm:p-6">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-64 w-64 animate-glow rounded-full bg-gradient-to-r from-purple-400 to-pink-500 opacity-40 blur-[120px] sm:h-96 sm:w-96" />
        <div className="absolute -bottom-40 -left-40 h-56 w-56 animate-float rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-30 blur-[100px] sm:h-80 sm:w-80" />
      </div>

      <main className="relative z-10 flex h-full w-full max-w-sm flex-col justify-center py-8">
        <div className="mb-8 text-center sm:mb-10">
          <div className="group relative mb-5 inline-flex sm:mb-6">
            <div className="absolute -inset-1 animate-glow rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-75 blur-lg transition duration-1000 group-hover:opacity-100" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 shadow-2xl transition-transform duration-300 hover:scale-110 sm:h-16 sm:w-16">
              <BookMarked className="h-7 w-7 text-white sm:h-9 sm:w-9" />
              <Sparkles className="absolute -right-1 -top-1 h-4 w-4 animate-pulse text-yellow-300 sm:h-5 sm:w-5" />
            </div>
          </div>
          <h1 className="mb-2 bg-gradient-to-r from-slate-900 via-purple-900 to-pink-900 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent dark:from-white dark:via-purple-200 dark:to-pink-200 sm:text-4xl">Join bl1nk</h1>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 sm:text-base">Start organizing your digital life ✨</p>
        </div>

        <form className="space-y-4 sm:space-y-5" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="ml-1 block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400" htmlFor="fullname">
              Full Name
            </label>
            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-purple-500">
                <User className="h-5 w-5" />
              </div>
              <input
                id="fullname"
                name="fullname"
                type="text"
                required
                placeholder="John Doe"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="block w-full rounded-2xl border-2 border-gray-200/50 bg-white/80 py-4 pl-12 pr-4 leading-5 text-gray-900 shadow-lg shadow-gray-200/50 backdrop-blur-sm transition-all duration-300 placeholder:text-gray-400 hover:border-gray-300 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/20 dark:border-gray-700/50 dark:bg-gray-800/50 dark:text-white dark:shadow-gray-900/50 dark:hover:border-gray-600 dark:focus:border-purple-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="ml-1 block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400" htmlFor="email">
              Email Address
            </label>
            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-purple-500">
                <Mail className="h-5 w-5" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="block w-full rounded-2xl border-2 border-gray-200/50 bg-white/80 py-4 pl-12 pr-4 leading-5 text-gray-900 shadow-lg shadow-gray-200/50 backdrop-blur-sm transition-all duration-300 placeholder:text-gray-400 hover:border-gray-300 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/20 dark:border-gray-700/50 dark:bg-gray-800/50 dark:text-white dark:shadow-gray-900/50 dark:hover:border-gray-600 dark:focus:border-purple-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="ml-1 block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400" htmlFor="password">
              Password
            </label>
            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-purple-500">
                <Lock className="h-5 w-5" />
              </div>
              <input
                id="password"
                name="password"
                required
                placeholder="••••••••"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="block w-full rounded-2xl border-2 border-gray-200/50 bg-white/80 py-4 pl-12 pr-12 leading-5 text-gray-900 shadow-lg shadow-gray-200/50 backdrop-blur-sm transition-all duration-300 placeholder:text-gray-400 hover:border-gray-300 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/20 dark:border-gray-700/50 dark:bg-gray-800/50 dark:text-white dark:shadow-gray-900/50 dark:hover:border-gray-600 dark:focus:border-purple-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4 text-gray-400 transition-all duration-300 hover:scale-110 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>

            <div className="ml-1 flex gap-1.5 pt-2">
              <div className="h-1.5 w-1/4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-sm" />
              <div className="h-1.5 w-1/4 rounded-full bg-purple-200 dark:bg-purple-900" />
              <div className="h-1.5 w-1/4 rounded-full bg-purple-200 dark:bg-purple-900" />
              <div className="h-1.5 w-1/4 rounded-full bg-purple-200 dark:bg-purple-900" />
            </div>
            <p className="ml-1 text-xs font-medium text-gray-500 dark:text-gray-400">Minimum 8 characters</p>
          </div>

          <div className="flex items-start pt-2">
            <div className="flex h-5 items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
                className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-white text-primary focus:ring-0 dark:border-gray-600 dark:bg-gray-800"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-700 dark:text-gray-300" htmlFor="terms">
                I agree to the{' '}
                <a className="font-semibold text-primary transition-colors hover:text-blue-500" href="#">
                  Terms
                </a>{' '}
                and{' '}
                <a className="font-semibold text-primary transition-colors hover:text-blue-500" href="#">
                  Privacy Policy
                </a>
                .
              </label>
            </div>
          </div>

          {(message || error) && (
            <div
              className={`animate-in slide-in-from-top-2 rounded-2xl border-2 px-4 py-3 text-sm font-medium shadow-lg ${
                (message || error)?.toLowerCase().includes('success') ||
                (message || '').toLowerCase().includes('check your email')
                  ? 'border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 dark:border-emerald-800 dark:from-emerald-950 dark:to-green-950 dark:text-emerald-300'
                  : 'border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 dark:border-rose-800 dark:from-rose-950 dark:to-pink-950 dark:text-rose-300'
              }`}
            >
              {message || error}
            </div>
          )}

          <button
            className="group relative mt-4 w-full transform overflow-hidden rounded-2xl border border-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-4 py-4 text-base font-bold text-white shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/60 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-purple-900/30"
            type="submit"
            disabled={isLoading}
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">{isLoading ? 'Creating account...' : 'Create Account'}</span>
          </button>
        </form>

        <div className="relative mb-6 mt-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-200 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 px-4 text-xs font-bold uppercase tracking-widest text-gray-500 dark:from-[#0a0e1a] dark:via-[#101622] dark:to-[#1a1535] dark:text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4">
          <button
            className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white/80 px-4 py-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-gray-300 hover:shadow-xl active:scale-[0.98] dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-gray-600"
            type="button"
            onClick={() => void signInWithGoogle()}
          >
            <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent to-gray-50 transition-transform duration-300 group-hover:translate-y-0 dark:to-gray-800" />
            <div className="relative flex items-center justify-center">
              <span className="mr-3 h-6 w-6 rounded-full bg-[conic-gradient(from_0deg,_#ea4335_0_25%,_#fbbc05_25%_50%,_#34a853_50%_75%,_#4285f4_75%_100%)] shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Google</span>
            </div>
          </button>
          <button
            className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white/80 px-4 py-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-gray-300 hover:shadow-xl active:scale-[0.98] dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-gray-600"
            type="button"
            onClick={() => void onGithubSignup()}
          >
            <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent to-gray-50 transition-transform duration-300 group-hover:translate-y-0 dark:to-gray-800" />
            <div className="relative flex items-center justify-center">
              <Github className="mr-3 h-6 w-6 text-gray-900 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 dark:text-white" />
              <span className="text-sm font-bold text-gray-700 dark:text-gray-200">GitHub</span>
            </div>
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <Link className="ml-1 font-bold text-purple-600 transition-all duration-300 hover:text-pink-600 dark:text-purple-400 dark:hover:text-pink-400" href="/login">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </main>
  )
}
