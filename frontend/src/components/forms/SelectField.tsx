import { SelectHTMLAttributes } from "react";
import { FormField } from "./FormField";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  description?: string;
}

export function SelectField({
  id,
  label,
  options,
  placeholder = "Select an option",
  error,
  description,
  ...props
}: SelectFieldProps) {
  return (
    <FormField
      id={id}
      label={label}
      error={error}
      description={description}
      required={props.required}
    >
      <select
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
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}