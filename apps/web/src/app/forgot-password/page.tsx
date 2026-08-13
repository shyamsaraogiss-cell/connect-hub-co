'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { UnavailableAuthFlow } from '@/components/auth/UnavailableAuthFlow';

export default function ForgotPasswordPage() {
  return <UnavailableAuthFlow title="Password Recovery Unavailable" message="Password recovery is not available during the current pre-trial phase." />;
}

export function LegacyForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setSubmitting(true);
    try {
      const res = await forgotPassword({ email });
      setMessage(res.message);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to send reset email. Please try again.');
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
          <h1 className="mt-1 font-serif text-3xl text-teal-800">Forgot Password</h1>
          <p className="mt-2 text-sm text-stone-600">
            Enter your registered email address to receive password reset instructions
          </p>
        </div>

        {message && (
          <div className="mt-5 rounded-lg border border-teal-200 bg-teal-50 p-4 text-xs text-teal-800">
            <strong>Check your inbox:</strong> {message}
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700" role="alert">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Registered Email Address *
            </label>
            <input
              className="mt-1 w-full rounded-xl border border-teal-900/25 bg-amber-50/40 p-3 text-sm text-stone-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <button
            className="mt-2 w-full rounded-xl bg-teal-800 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-teal-900 disabled:opacity-50"
            disabled={submitting}
            type="submit"
          >
            {submitting ? 'Sending Request…' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 border-t border-stone-200 pt-5 text-center text-xs text-stone-600">
          Remembered your password?{' '}
          <Link href="/login" className="font-bold text-teal-800 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
