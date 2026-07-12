import { TextareaHTMLAttributes } from "react";
import { FormField } from "./FormField";

interface TextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
  description?: string;
}

export function TextAreaField({
  id,
  label,
  error,
  description,
  rows = 4,
  ...props
}: TextAreaFieldProps) {
  return (
    <FormField
      id={id}
      label={label}
      error={error}
      description={description}
      required={props.required}
    >
      <textarea
        id={id}
        rows={rows}
        {...props}
        aria-invalid={!!error}
        aria-describedby={[
          description ? `${id}-description` : null,
          error ? `${id}-error` : null,
        ]
          .filter(Boolean)
          .join(" ") || undefined}
        className="w-full rounded-md border px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </FormField>
  );
}