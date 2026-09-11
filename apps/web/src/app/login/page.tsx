'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';

export default function LoginPage() {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered') === '1';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login({ email, password });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to sign in.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-stone-50 p-6">
      <div className="w-full max-w-md rounded-2xl border border-teal-900/20 bg-white p-8 shadow-lg">
        <div className="text-center">
          <span className="text-xs font-black uppercase tracking-widest text-amber-600">
            CONNECT HUB CO.
          </span>
          <h1 className="mt-1 font-serif text-3xl text-teal-800">Sign In</h1>
          <p className="mt-2 text-sm text-stone-600">
            Sign in with your email and password
          </p>
        </div>

        {registered ? (
          <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-3 text-xs text-green-800" role="status">
            Account created. Sign in with your email and password.
          </div>
        ) : null}

        {error ? (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700" role="alert">
            {error}
          </div>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Email Address *
            </label>
            <input
              className="mt-1 w-full rounded-xl border border-teal-900/25 bg-amber-50/40 p-3 text-sm text-stone-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Password *
            </label>
            <input
              className="mt-1 w-full rounded-xl border border-teal-900/25 bg-amber-50/40 p-3 text-sm text-stone-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            className="mt-2 w-full rounded-xl bg-teal-800 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-teal-900 disabled:opacity-50"
            disabled={submitting}
            type="submit"
          >
            {submitting ? 'Signing In…' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 border-t border-stone-200 pt-5 text-center text-xs text-stone-600">
          Need an account?{' '}
          <Link href="/register" className="font-bold text-teal-800 hover:underline">
            Sign up here
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/"
            className="inline-block rounded-xl border border-teal-900/25 px-5 py-2.5 text-xs font-bold text-teal-800 transition-colors hover:bg-teal-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
