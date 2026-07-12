export default function Footer() {
  return (
    <footer className="mt-20 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <h2 className="text-2xl font-bold">
          Connect Hub Co.
        </h2>

        <p className="mt-2 text-slate-300">
          AI-Powered Religious Services Platform
        </p>

        <div className="mt-6 flex flex-wrap gap-6 text-sm">

          <a href="/">Home</a>

          <a href="/services">Services</a>

          <a href="/pitrumoksha">PitruMoksha</a>

          <a href="/travel">Travel Assistance</a>

          <a href="/partner">Become a Religious Partner</a>

          <a href="/contact">Contact</a>

        </div>

        <hr className="my-6 border-slate-700" />

        <p className="text-sm text-slate-400">
          © 2026 Connect Hub Co. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}