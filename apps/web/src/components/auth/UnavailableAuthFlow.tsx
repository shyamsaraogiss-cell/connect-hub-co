import Link from 'next/link';

export function UnavailableAuthFlow({ title, message }: { title: string; message: string }) {
  return (
    <main className="grid min-h-screen place-items-center bg-stone-50 p-6">
      <div className="w-full max-w-md rounded-2xl border border-teal-900/20 bg-white p-8 text-center shadow-lg">
        <span className="text-xs font-black uppercase tracking-widest text-amber-600">CONNECT HUB CO.</span>
        <h1 className="mt-1 font-serif text-3xl text-teal-800">{title}</h1>
        <p className="mt-3 text-sm text-stone-600">{message}</p>
        <Link href="/login" className="mt-6 inline-block rounded-xl bg-teal-800 px-5 py-3 text-xs font-bold text-white shadow hover:bg-teal-900">
          Return to Sign In
        </Link>
      </div>
    </main>
  );
}
