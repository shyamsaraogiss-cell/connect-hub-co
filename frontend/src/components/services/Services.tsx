export default function Services() {
  const services = [
    {
      title: "PitruMoksha Gaya",
      description: "Complete assistance for Pitru Karma and Pind Daan in Gaya.",
    },
    {
      title: "Ritual Services",
      description: "Verified Pandits and religious services across India.",
    },
    {
      title: "Travel Assistance",
      description: "End-to-end travel coordination for pilgrims and families.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Our Services
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition"
            >
              <h3 className="mb-4 text-2xl font-semibold">
                {service.title}
              </h3>

              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}