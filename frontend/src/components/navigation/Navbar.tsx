import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <div>
          <Link href="/">
            <h1 className="cursor-pointer text-2xl font-bold text-blue-700">
              Connect Hub Co.
            </h1>
          </Link>

          <p className="text-sm text-gray-500">
            Faith • Service • Trust
          </p>
        </div>

        <nav className="hidden gap-8 font-medium md:flex">

          <Link href="/">Home</Link>

          <Link href="/services">Services</Link>

          <Link href="/pitrumoksha">PitruMoksha</Link>

          <Link href="/travel">Travel</Link>

          <Link href="/about">About</Link>

          <Link href="/contact">Contact</Link>

        </nav>

        <div className="flex gap-3">

          <Link
            href="/login"
            className="rounded-md border border-blue-600 px-4 py-2 text-blue-600"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-md bg-blue-600 px-4 py-2 text-white"
          >
            Register
          </Link>

        </div>

      </div>
    </header>
  );
}