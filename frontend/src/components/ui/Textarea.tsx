type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea(props: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        props.className ?? ""
      }`}
    />
  );
}