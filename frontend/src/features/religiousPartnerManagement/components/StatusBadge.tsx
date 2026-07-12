interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({
  status,
}: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();

  let className =
    "inline-flex rounded-full px-3 py-1 text-sm font-medium ";

  switch (normalizedStatus) {
    case "verified":
      className +=
        "bg-green-100 text-green-800";
      break;

    case "rejected":
      className +=
        "bg-red-100 text-red-800";
      break;

    case "suspended":
      className +=
        "bg-gray-200 text-gray-800";
      break;

    default:
      className +=
        "bg-yellow-100 text-yellow-800";
  }

  return (
    <span className={className}>
      {status}
    </span>
  );
}