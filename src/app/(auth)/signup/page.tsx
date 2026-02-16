'use client'

import Link from 'next/link'
import { FormEvent, useState, useMemo } from 'react'
import { BookMarked, Eye, EyeOff, Github, Lock, Mail, User, Sparkles, Check } from 'lucide-react'
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

  const passwordStrength = useMemo(() => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.match(/[A-Z]/)) strength++
    if (password.match(/[0-9]/)) strength++
    if (password.match(/[^A-Za-z0-9]/)) strength++
    return strength
  }, [password])

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
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 p-6 text-slate-900 transition-colors duration-300 dark:from-[#0a0e1a] dark:via-[#101622] dark:to-[#1a1535] dark:text-slate-100">
      {/* Animated background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] animate-glow rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 opacity-30 blur-[150px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] animate-float rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20 blur-[120px]" />
        <div className="absolute right-[20%] top-[20%] h-[300px] w-[300px] animate-float rounded-full bg-gradient-to-r from-pink-400 to-purple-500 opacity-15 blur-[100px]" style={{ animationDelay: '3s' }} />
      </div>

      <main className="relative z-10 flex h-full w-full max-w-[440px] flex-col justify-center py-8">
        {/* Logo & Header */}
        <div className="mb-10 text-center">
          <div className="group relative mb-8 inline-flex">
            <div className="absolute -inset-2 animate-glow rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-70 blur-xl transition duration-1000 group-hover:opacity-100" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 shadow-2xl shadow-purple-500/30 transition-transform duration-500 hover:scale-110">
              <BookMarked className="h-10 w-10 text-white" />
              <Sparkles className="absolute -right-2 -top-2 h-5 w-5 animate-pulse text-yellow-300 drop-shadow-lg" />
            </div>
          </div>
          
          <h1 className="mb-3 bg-gradient-to-r from-slate-900 via-purple-800 to-pink-800 bg-clip-text text-5xl font-black tracking-tight text-transparent dark:from-white dark:via-purple-200 dark:to-pink-200">
            Join bl1nk
          </h1>
          <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
            Start organizing your digital life ✨
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={onSubmit}>
          {/* Full Name Input */}
          <div className="space-y-2">
            <label className="ml-1 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400" htmlFor="fullname">
              Full Name
            </label>
            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-slate-400 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-purple-500">
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
                className="block w-full rounded-2xl border-2 border-slate-200/60 bg-white/90 py-4 pl-14 pr-5 text-base text-slate-900 shadow-xl shadow-slate-200/30 backdrop-blur-sm transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/15 dark:border-slate-700/50 dark:bg-slate-800/70 dark:text-white dark:shadow-slate-900/30 dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-purple-400"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="ml-1 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400" htmlFor="email">
              Email Address
            </label>
            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-slate-400 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-purple-500">
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
                className="block w-full rounded-2xl border-2 border-slate-200/60 bg-white/90 py-4 pl-14 pr-5 text-base text-slate-900 shadow-xl shadow-slate-200/30 backdrop-blur-sm transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/15 dark:border-slate-700/50 dark:bg-slate-800/70 dark:text-white dark:shadow-slate-900/30 dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-purple-400"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="ml-1 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400" htmlFor="password">
              Password
            </label>
            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-slate-400 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-purple-500">
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
                className="block w-full rounded-2xl border-2 border-slate-200/60 bg-white/90 py-4 pl-14 pr-14 text-base text-slate-900 shadow-xl shadow-slate-200/30 backdrop-blur-sm transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/15 dark:border-slate-700/50 dark:bg-slate-800/70 dark:text-white dark:shadow-slate-900/30 dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-purple-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-5 text-slate-400 transition-all duration-300 hover:scale-110 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            <div className="ml-1 flex gap-1.5 pt-2">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-1.5 w-1/4 rounded-full transition-all duration-300 ${
                    passwordStrength >= level
                      ? level <= 1
                        ? 'bg-gradient-to-r from-red-500 to-orange-500'
                        : level <= 2
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                        : level <= 3
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>
            <p className="ml-1 text-xs font-medium text-slate-400 dark:text-slate-500">
              {passwordStrength === 0 && 'Enter a password'}
              {passwordStrength === 1 && 'Weak password'}
              {passwordStrength === 2 && 'Fair password'}
              {passwordStrength === 3 && 'Good password'}
              {passwordStrength === 4 && 'Strong password'}
            </p>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start pt-2">
            <div className="flex h-5 items-center">
              <button
                type="button"
                onClick={() => setAcceptedTerms(!acceptedTerms)}
                className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all duration-300 ${
                  acceptedTerms
                    ? 'border-purple-500 bg-gradient-to-br from-purple-500 to-pink-500'
                    : 'border-slate-300 hover:border-purple-400 dark:border-slate-600 dark:hover:border-purple-500'
                }`}
              >
                {acceptedTerms && <Check className="h-3 w-3 text-white" />}
              </button>
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-slate-600 dark:text-slate-300" htmlFor="terms">
                I agree to the{' '}
                <a className="font-semibold text-purple-600 transition-colors hover:text-blue-500 dark:text-purple-400 dark:hover:text-blue-400" href="#">
                  Terms
                </a>{' '}
                and{' '}
                <a className="font-semibold text-purple-600 transition-colors hover:text-blue-500 dark:text-purple-400 dark:hover:text-blue-400" href="#">
                  Privacy Policy
                </a>
                .
              </label>
            </div>
          </div>

          {/* Error/Success Message */}
          {(message || error) && (
            <div
              className={`animate-in slide-in-from-top-2 rounded-2xl border-2 px-5 py-4 text-sm font-medium shadow-lg ${
                (message || error)?.toLowerCase().includes('success') ||
                (message || '').toLowerCase().includes('check your email')
                  ? 'border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 dark:border-emerald-800/50 dark:from-emerald-950/50 dark:to-green-950/50 dark:text-emerald-300'
                  : 'border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 dark:border-rose-800/50 dark:from-rose-950/50 dark:to-pink-950/50 dark:text-rose-300'
              }`}
            >
              {message || error}
            </div>
          )}

          {/* Submit Button */}
          <button
            className="group relative mt-4 w-full transform overflow-hidden rounded-2xl border border-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-5 py-4.5 text-base font-bold text-white shadow-2xl shadow-purple-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/40 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-purple-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={isLoading}
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">{isLoading ? 'Creating account...' : 'Create Account'}</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative mb-6 mt-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-slate-200/60 dark:border-slate-700/50" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 px-5 text-xs font-bold uppercase tracking-widest text-slate-400 dark:from-[#0a0e1a] dark:via-[#101622] dark:to-[#1a1535] dark:text-slate-500">Or continue with</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <button
            className="group relative overflow-hidden rounded-2xl border-2 border-slate-200/60 bg-white/90 px-5 py-4.5 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-slate-300 hover:shadow-2xl active:scale-[0.98] dark:border-slate-700/50 dark:bg-slate-800/70 dark:hover:border-slate-600"
            type="button"
            onClick={() => void signInWithGoogle()}
          >
            <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent to-slate-50/50 transition-transform duration-300 group-hover:translate-y-0 dark:to-slate-800/50" />
            <div className="relative flex items-center justify-center gap-3">
              <span className="h-6 w-6 rounded-full bg-[conic-gradient(from_0deg,_#ea4335_0_25%,_#fbbc05_25%_50%,_#34a853_50%_75%,_#4285f4_75%_100%)] shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Google</span>
            </div>
          </button>
          
          <button
            className="group relative overflow-hidden rounded-2xl border-2 border-slate-200/60 bg-white/90 px-5 py-4.5 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-slate-300 hover:shadow-2xl active:scale-[0.98] dark:border-slate-700/50 dark:bg-slate-800/70 dark:hover:border-slate-600"
            type="button"
            onClick={() => void onGithubSignup()}
          >
            <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent to-slate-50/50 transition-transform duration-300 group-hover:translate-y-0 dark:to-slate-800/50" />
            <div className="relative flex items-center justify-center gap-3">
              <Github className="h-6 w-6 text-slate-900 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 dark:text-white" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">GitHub</span>
            </div>
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Already have an account?
            <Link className="ml-2 font-bold text-purple-600 transition-all duration-300 hover:text-pink-600 dark:text-purple-400 dark:hover:text-pink-400" href="/login">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </main>
  )
}
