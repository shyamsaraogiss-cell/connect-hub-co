"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try { await login({ email, password }); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to sign in."); }
    finally { setSubmitting(false); }
  }

  return <main className="grid min-h-screen place-items-center bg-gray-100 p-6">
    <form className="w-full max-w-sm space-y-5 rounded-lg bg-white p-8 shadow" onSubmit={submit}>
      <div><h1 className="text-2xl font-bold">Connect Hub Co</h1><p className="text-gray-600">Sign in to the ERP</p></div>
      {error ? <p className="rounded bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p> : null}
      <label className="block">Email<input className="mt-1 block w-full rounded border p-2" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
      <label className="block">Password<input className="mt-1 block w-full rounded border p-2" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={8} required /></label>
      <button className="w-full rounded bg-blue-700 px-4 py-2 text-white disabled:opacity-50" disabled={submitting} type="submit">{submitting ? "Signing in..." : "Sign in"}</button>
    </form>
  </main>;
}
