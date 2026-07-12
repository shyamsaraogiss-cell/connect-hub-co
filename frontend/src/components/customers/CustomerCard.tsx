"use client";

type CustomerCardProps = {
  name: string;
  email: string;
  service: string;
  status: string;
};

export default function CustomerCard({
  name,
  email,
  service,
  status,
}: CustomerCardProps) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition">

      <h2 className="text-lg font-bold text-slate-800">
        {name}
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        {email}
      </p>

      <div className="mt-4 flex items-center justify-between">

        <span className="rounded bg-blue-100 px-3 py-1 text-sm text-blue-700">
          {service}
        </span>

        <span className="rounded bg-green-100 px-3 py-1 text-sm text-green-700">
          {status}
        </span>

      </div>

    </div>
  );
}