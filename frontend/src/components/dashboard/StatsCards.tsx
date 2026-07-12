export default function StatsCards() {
  const cards = [
    {
      title: "Total Bookings",
      value: "0",
      icon: "📖",
    },
    {
      title: "Upcoming Services",
      value: "0",
      icon: "🗓️",
    },
    {
      title: "Travel Requests",
      value: "0",
      icon: "✈️",
    },
    {
      title: "Support Tickets",
      value: "0",
      icon: "💬",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl bg-white p-6 shadow"
        >
          <div className="text-3xl">
            {card.icon}
          </div>

          <h3 className="mt-3 text-gray-500">
            {card.title}
          </h3>

          <p className="mt-2 text-3xl font-bold">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}