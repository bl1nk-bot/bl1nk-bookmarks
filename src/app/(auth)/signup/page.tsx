'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { BookMarked, Eye, EyeOff, Github, Lock, Mail, User } from 'lucide-react'
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
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-slate-100 p-6 text-gray-900 transition-colors duration-300 dark:bg-[#101622] dark:text-gray-100">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/20 opacity-50 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 opacity-30 blur-[80px]" />
      </div>

      <main className="relative z-10 flex h-full w-full max-w-sm flex-col justify-center">
        <div className="mb-10 text-center">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-blue-600 shadow-lg shadow-primary/30">
            <BookMarked className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Join bl1nk</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Start organizing your digital life today.</p>
        </div>

        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="space-y-1.5">
            <label className="ml-1 block text-xs font-medium text-gray-700 dark:text-gray-300" htmlFor="fullname">
              Full Name
            </label>
            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 transition-colors group-focus-within:text-primary">
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
                className="block w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-3 leading-5 text-gray-900 shadow-sm transition-all placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800/50 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="ml-1 block text-xs font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
              Email Address
            </label>
            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 transition-colors group-focus-within:text-primary">
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
                className="block w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-3 leading-5 text-gray-900 shadow-sm transition-all placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800/50 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="ml-1 block text-xs font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
              Password
            </label>
            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 transition-colors group-focus-within:text-primary">
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
                className="block w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-10 leading-5 text-gray-900 shadow-sm transition-all placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800/50 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>

            <div className="ml-1 flex gap-1 pt-1">
              <div className="h-1 w-1/4 rounded-full bg-primary" />
              <div className="h-1 w-1/4 rounded-full bg-primary/30" />
              <div className="h-1 w-1/4 rounded-full bg-primary/30" />
              <div className="h-1 w-1/4 rounded-full bg-primary/30" />
            </div>
            <p className="ml-1 text-[10px] text-gray-500 dark:text-gray-400">Minimum 8 characters</p>
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
            <p
              className={`rounded-lg border px-3 py-2 text-sm ${
                (message || error)?.toLowerCase().includes('success') ||
                (message || '').toLowerCase().includes('check your email')
                  ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                  : 'border-rose-100 bg-rose-50 text-rose-700'
              }`}
            >
              {message || error}
            </p>
          )}

          <button
            className="mt-4 w-full transform rounded-xl border border-transparent bg-primary px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-blue-600 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-[#101622]"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="relative mb-6 mt-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-slate-100 px-2 text-gray-500 dark:bg-[#101622]">Or continue with</span>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-3">
          <button
            className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200 dark:hover:bg-gray-800"
            type="button"
            onClick={() => void signInWithGoogle()}
          >
            <span className="mr-2 h-5 w-5 rounded-full bg-[conic-gradient(from_0deg,_#ea4335_0_25%,_#fbbc05_25%_50%,_#34a853_50%_75%,_#4285f4_75%_100%)]" />
            Google
          </button>
          <button
            className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200 dark:hover:bg-gray-800"
            type="button"
            onClick={() => void onGithubSignup()}
          >
            <Github className="mr-2 h-5 w-5" />
            GitHub
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <Link className="ml-1 font-semibold text-primary transition-colors hover:text-blue-500" href="/login">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </main>
  )
}
