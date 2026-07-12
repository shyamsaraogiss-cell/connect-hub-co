import { InputHTMLAttributes } from "react";
import { FormField } from "./FormField";

interface CheckboxFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  id: string;
  label: string;
  error?: string;
  description?: string;
}

export function CheckboxField({
  id,
  label,
  error,
  description,
  ...props
}: CheckboxFieldProps) {
  return (
    <FormField
      id={id}
      label=""
      error={error}
      description={description}
    >
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          {...props}
          aria-invalid={!!error}
          aria-describedby={[
            description ? `${id}-description` : null,
            error ? `${id}-error` : null,
          ]
            .filter(Boolean)
            .join(" ") || undefined}
          className="mt-1 h-4 w-4 rounded border focus:ring-2 focus:ring-blue-500"
        />

        <label
          htmlFor={id}
          className="text-sm font-medium cursor-pointer"
        >
          {label}

          {props.required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      </div>
    </FormField>
  );
}