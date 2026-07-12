export default function Gateway() {
  const journeys = [
    {
      icon: "🕉️",
      title: "PitruMoksha Gaya",
      subtitle: "For NRI (Online / Offline)\nFor Others (Online / Offline)",
    },
    {
      icon: "🙏",
      title: "Ritual Services",
      subtitle: "For NRI (Online / Offline)\nFor Others (Online / Offline)",
    },
    {
      icon: "✈️",
      title: "Travel Assistance",
      subtitle: "For International Visitors / NRIs\nFor Domestic Travelers (Future Expansion)",
    },
  ];

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-4 text-center text-4xl font-bold">
          Choose Your Journey
        </h2>

        <p className="mb-12 text-center text-gray-600">
          Select the service you wish to explore.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {journeys.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border bg-white p-8 shadow-sm transition hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mb-4 text-5xl">
                {item.icon}
              </div>

              <h3 className="mb-4 text-2xl font-bold">
                {item.title}
              </h3>

              <p className="whitespace-pre-line text-gray-600">
                {item.subtitle}
              </p>

              <button className="mt-8 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
                Explore
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}