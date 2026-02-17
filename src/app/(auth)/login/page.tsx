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
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-6 text-foreground">
      {/* Subtle gradient background for depth - CLARITY DOCS compliant */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div 
          className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-[0.15]" 
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.03))'
          }}
        />
      </div>

      <section className="relative z-10 w-full max-w-[420px]">
        {/* Logo & Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary transition-transform duration-180 ease-standard hover:-translate-y-1">
            <BookMarked className="h-8 w-8 text-primary-foreground" />
          </div>

          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            Welcome Back
          </h1>
          <p className="text-base text-muted-foreground">
            Continue your bookmark journey
          </p>
        </div>

        {/* Form */}
        <form className="w-full space-y-4" onSubmit={onSubmit}>
          {/* Email Input */}
          <div className="group relative">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Mail className="h-5 w-5 text-muted-foreground transition-colors duration-180 ease-standard group-focus-within:text-primary" />
              </div>
              <input
                id="email"
                className="block w-full rounded-lg border border-border bg-card py-3 pl-12 pr-4 text-base text-foreground transition-all duration-180 ease-standard placeholder:text-muted-foreground hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="your@email.com"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="group relative">
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Lock className="h-5 w-5 text-muted-foreground transition-colors duration-180 ease-standard group-focus-within:text-primary" />
              </div>
              <input
                id="password"
                className="block w-full rounded-lg border border-border bg-card py-3 pl-12 pr-12 text-base text-foreground transition-all duration-180 ease-standard placeholder:text-muted-foreground hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4 text-muted-foreground transition-colors duration-180 ease-standard hover:text-foreground"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link 
              className="text-sm font-medium text-primary transition-colors duration-180 ease-standard hover:text-primary/80" 
              href="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>

          {/* Error Message */}
          {(message || error) && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
              {message || error}
            </div>
          )}

          {/* Submit Button */}
          <button
            className="group relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary py-3 text-base font-semibold text-primary-foreground transition-all duration-180 ease-standard hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50"
            disabled={isLoading}
            type="submit"
          >
            <span>{isLoading ? 'Logging in...' : 'Log In'}</span>
            {!isLoading && (
              <ArrowRight className="h-5 w-5 transition-transform duration-180 ease-standard group-hover:translate-x-1" />
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            className="group flex cursor-pointer items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-all duration-180 ease-standard hover:-translate-y-1 hover:border-primary/50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/20 active:translate-y-0"
            onClick={() => void signInWithGoogle()}
            type="button"
          >
            <span className="h-5 w-5 rounded-full bg-[conic-gradient(from_0deg,_#ea4335_0_25%,_#fbbc05_25%_50%,_#34a853_50%_75%,_#4285f4_75%_100%)]" />
            <span className="text-sm font-medium">Google</span>
          </button>

          <button
            className="group flex cursor-pointer items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-all duration-180 ease-standard hover:-translate-y-1 hover:border-primary/50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/20 active:translate-y-0"
            onClick={() => void onGithubLogin()}
            type="button"
          >
            <Github className="h-5 w-5" />
            <span className="text-sm font-medium">GitHub</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link 
              className="font-semibold text-primary transition-colors duration-180 ease-standard hover:text-primary/80" 
              href="/signup"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
