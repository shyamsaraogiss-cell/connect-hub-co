export default function HowItWorks() {
  const steps = [
    "Customer Enquiry",
    "GenZ Ritual AI",
    "Requirement Understanding",
    "Founder/Admin Review (if required)",
    "Verified Religious Partner",
    "Religious Service",
    "Lifetime Religious Relationship",
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            How It Works
          </h2>

          <p className="mt-5 mx-auto max-w-3xl text-lg text-gray-600">
            Every enquiry follows a transparent, professionally managed
            process to ensure quality, trust, and customer satisfaction.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-4 lg:grid-cols-7">

          {steps.map((step, index) => (
            <div
              key={step}
              className="rounded-xl bg-white border border-gray-200 p-6 text-center shadow-sm"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                {index + 1}
              </div>

              <h3 className="font-semibold">
                {step}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}