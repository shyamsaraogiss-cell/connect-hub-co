export default function WhyConnectHub() {
  const features = [
    {
      title: "AI-Assisted Religious Guidance",
      description:
        "GenZ Ritual AI helps customers understand their requirements before connecting them with the most suitable service.",
    },
    {
      title: "Verified Religious Partners",
      description:
        "Every Religious Partner is professionally verified to ensure authenticity, reliability, and service quality.",
    },
    {
      title: "Online & Offline Services",
      description:
        "Access trusted religious services from anywhere in the world through online or offline assistance.",
    },
    {
      title: "Founder Oversight",
      description:
        "Important enquiries and exceptional cases are personally reviewed to maintain quality and customer trust.",
    },
    {
      title: "Confidential & Secure",
      description:
        "Customer information is handled responsibly with privacy, confidentiality, and professionalism.",
    },
    {
      title: "Customer-First Approach",
      description:
        "Our mission is to build lifetime religious relationships through honesty, transparency, and dedicated service.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Why Connect Hub Co.
          </h2>

          <p className="mt-5 mx-auto max-w-3xl text-lg text-gray-600">
            Combining technology, verified Religious Partners, and human expertise
            to deliver trusted religious services with professionalism,
            transparency, and compassion.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-lg"
            >
              <h3 className="mb-4 text-2xl font-semibold">
                {item.title}
              </h3>

              <p className="text-gray-600">
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}