type SelectProps =
  React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select(props: SelectProps) {
  return (
    <select
      {...props}
      className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        props.className ?? ""
      }`}
    />
  );
}