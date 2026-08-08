'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || 'demo_verification_token';
  const { verifyEmail } = useAuth();

  const [verifying, setVerifying] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void verifyEmail({ token })
      .then((res) => {
        if (active) {
          setMessage(res.message);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof Error ? err.message : 'Email verification failed.');
        }
      })
      .finally(() => {
        if (active) {
          setVerifying(false);
        }
      });
    return () => {
      active = false;
    };
  }, [token, verifyEmail]);

  return (
    <main className="grid min-h-screen place-items-center bg-stone-50 p-6">
      <div className="w-full max-w-md rounded-2xl border border-teal-900/20 bg-white p-8 shadow-lg text-center">
        <span className="text-xs font-black uppercase tracking-widest text-amber-600">
          CONNECT HUB CO.
        </span>
        <h1 className="mt-1 font-serif text-3xl text-teal-800">Email Verification</h1>

        {verifying && (
          <div className="my-8">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-teal-800 border-t-transparent"></div>
            <p className="mt-3 text-sm text-stone-600">Verifying your email address token…</p>
          </div>
        )}

        {!verifying && message && (
          <div className="my-6 rounded-xl border border-teal-200 bg-teal-50 p-5 text-sm text-teal-900">
            <h3 className="font-bold text-teal-800">Verification Complete</h3>
            <p className="mt-2 text-xs text-stone-600">{message}</p>
            <div className="mt-5">
              <Link href="/login" className="inline-block rounded-xl bg-teal-800 px-5 py-3 text-xs font-bold text-white shadow hover:bg-teal-900">
                Proceed to Sign In
              </Link>
            </div>
          </div>
        )}

        {!verifying && error && (
          <div className="my-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            <h3 className="font-bold">Verification Failed</h3>
            <p className="mt-2 text-xs">{error}</p>
            <div className="mt-5">
              <Link href="/login" className="inline-block rounded-xl bg-teal-800 px-5 py-3 text-xs font-bold text-white shadow hover:bg-teal-900">
                Back to Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
