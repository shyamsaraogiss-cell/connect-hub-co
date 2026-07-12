export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-700 to-sky-500 text-white">
      <div className="mx-auto max-w-7xl px-6 py-28">

        <div className="max-w-4xl">

          <p className="mb-4 text-lg font-semibold uppercase tracking-widest text-yellow-300">
            Faith • Service • Trust
          </p>

          <h1 className="text-6xl font-extrabold leading-tight">
            India's Trusted
            <br />
            AI-Powered Religious
            <br />
            Service Platform
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-9 text-blue-100">
            Connect Hub Co. connects families with verified Religious Partners,
            authentic religious services, travel assistance, and AI-powered
            guidance through one trusted platform.
          </p>

          <div className="mt-12 flex flex-wrap gap-5">

            <button className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-700 shadow-lg hover:bg-gray-100">
              Explore Services
            </button>

            <button className="rounded-lg border border-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-blue-700">
              Find Religious Partner
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}