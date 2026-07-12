type WelcomeCardProps = {
  fullName?: string;
};

export default function WelcomeCard({
  fullName,
}: WelcomeCardProps) {
  return (
    <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow">

      <h2 className="text-3xl font-bold">
        Welcome back, {fullName || "Guest"}!
      </h2>

      <p className="mt-3 text-blue-100">
        Manage your religious services, bookings, travel assistance,
        and profile from one secure dashboard.
      </p>

    </div>
  );
}