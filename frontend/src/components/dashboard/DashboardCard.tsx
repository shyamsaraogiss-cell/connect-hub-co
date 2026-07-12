type DashboardCardProps = {
  title: string;
  description: string;
  icon: string;
};

export default function DashboardCard({
  title,
  description,
  icon,
}: DashboardCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg">

      <div className="text-4xl">
        {icon}
      </div>

      <h3 className="mt-4 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-2 text-gray-500">
        {description}
      </p>

    </div>
  );
}