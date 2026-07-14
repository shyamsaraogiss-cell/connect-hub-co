interface Props {
  message: string;
}

export default function EmptyState({
  message,
}: Props) {
  return (
    <div className="rounded-lg border bg-gray-50 p-12 text-center text-gray-500">
      {message}
    </div>
  );
}