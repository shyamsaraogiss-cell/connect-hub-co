'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';

export default function RegisterPage() {
  const { register } = useAuth();
  const [role, setRole] = useState<'CUSTOMER' | 'PARTNER'>('CUSTOMER');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!agreeToTerms) {
      setError('You must agree to the Service Terms and Privacy Policy to register.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await register({ name, email, phone, password, role, agreeToTerms });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to complete registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-stone-50 p-6">
      <div className="w-full max-w-lg rounded-2xl border border-teal-900/20 bg-white p-8 shadow-lg">
        <div className="text-center">
          <span className="text-xs font-black uppercase tracking-widest text-amber-600">
            CONNECT HUB CO.
          </span>
          <h1 className="mt-1 font-serif text-3xl text-teal-800">Create an Account</h1>
          <p className="mt-2 text-sm text-stone-600">
            Register as a Seeking Family Customer or verified Religious Partner
          </p>
        </div>

        {/* Account Type Selection */}
        <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-stone-100 p-1.5 text-xs font-bold">
          <button
            type="button"
            className={`rounded-lg py-2.5 transition-all ${
              role === 'CUSTOMER'
                ? 'bg-teal-800 text-white shadow'
                : 'text-stone-600 hover:text-teal-800'
            }`}
            onClick={() => setRole('CUSTOMER')}
          >
            Family Customer
          </button>
          <button
            type="button"
            className={`rounded-lg py-2.5 transition-all ${
              role === 'PARTNER'
                ? 'bg-teal-800 text-white shadow'
                : 'text-stone-600 hover:text-teal-800'
            }`}
            onClick={() => setRole('PARTNER')}
          >
            Religious Partner
          </button>
        </div>

        {error && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700" role="alert">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Full Name *
            </label>
            <input
              className="mt-1 w-full rounded-xl border border-teal-900/25 bg-amber-50/40 p-3 text-sm text-stone-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={role === 'PARTNER' ? 'Pandit / Acharya / Full Name' : 'Full Name'}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-teal-800">
                Phone / WhatsApp *
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-teal-900/25 bg-amber-50/40 p-3 text-sm text-stone-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 Mobile Number"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Password (Minimum 8 Characters) *
            </label>
            <input
              className="mt-1 w-full rounded-xl border border-teal-900/25 bg-amber-50/40 p-3 text-sm text-stone-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              placeholder="••••••••"
              required
            />
          </div>

          <label className="flex items-start gap-2 pt-2 text-xs text-stone-600">
            <input
              type="checkbox"
              className="mt-0.5 accent-teal-800"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              required
            />
            <span>
              I agree to the Connect Hub Co. Service Terms, Confidentiality Standards, and Privacy Policy.
            </span>
          </label>

          <button
            className="mt-2 w-full rounded-xl bg-teal-800 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-teal-900 disabled:opacity-50"
            disabled={submitting}
            type="submit"
          >
            {submitting ? 'Registering Account…' : `Register as ${role === 'CUSTOMER' ? 'Customer' : 'Religious Partner'}`}
          </button>
        </form>

        <div className="mt-6 border-t border-stone-200 pt-5 text-center text-xs text-stone-600">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-teal-800 hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </main>
  );
}
