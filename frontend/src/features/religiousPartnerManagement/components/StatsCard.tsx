interface StatsCardProps {
  title: string;
  value: number;
}

export function StatsCard({
  title,
  value,
}: StatsCardProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}