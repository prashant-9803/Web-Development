const AuthDetails = () => {
  return (
    <div className="w-full max-w-md px-6 py-8 sm:px-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          Enter your email and password to access your account.
        </p>
      </div>

      {/* Form UI */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1.5" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@company.com"
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-zinc-900/5"
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-zinc-700" htmlFor="password">
              Password
            </label>
            <a
              href="#"
              className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 pr-11 text-sm text-zinc-900 placeholder:text-zinc-400 transition focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-zinc-900/5"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-zinc-400 hover:text-zinc-600 cursor-pointer"
              aria-label="Toggle password visibility"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 accent-zinc-900 cursor-pointer"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-600 select-none cursor-pointer">
            Remember me for 30 days
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center rounded-xl bg-zinc-950 py-2.5 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.99] cursor-pointer"
        >
          Sign in
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-3 text-zinc-400 font-medium tracking-wider">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Logins */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-sm font-medium text-zinc-700 shadow-xs hover:bg-zinc-50 transition cursor-pointer"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Continue with Google</span>
      </button>

      {/* Switch between Sign In / Sign Up */}
      <div className="mt-8 text-center text-sm text-zinc-500">
        Don't have an account?{' '}
        <a
          href="#"
          className="font-semibold text-zinc-900 underline underline-offset-4 hover:text-black cursor-pointer"
        >
          Sign up
        </a>
      </div>
    </div>
  )
}

export default AuthDetails