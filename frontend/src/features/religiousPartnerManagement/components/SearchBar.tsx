interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search by name, mobile or city..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
    />
  );
}