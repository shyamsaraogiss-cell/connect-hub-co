import { InputHTMLAttributes } from "react";
import { FormField } from "./FormField";

interface TextInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  description?: string;
}

export function TextInput({
  id,
  label,
  error,
  description,
  ...props
}: TextInputProps) {
  return (
    <FormField
      id={id}
      label={label}
      error={error}
      description={description}
      required={props.required}
    >
      <input
        id={id}
        {...props}
        aria-invalid={!!error}
        aria-describedby={[
          description ? `${id}-description` : null,
          error ? `${id}-error` : null,
        ]
          .filter(Boolean)
          .join(" ") || undefined}
        className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </FormField>
  );
}