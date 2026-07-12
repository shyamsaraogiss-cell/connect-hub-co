import { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  description?: string;
  children: ReactNode;
}

export function FormField({
  id,
  label,
  required = false,
  error,
  description,
  children,
}: FormFieldProps) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="space-y-2">
      {label && (
  <label
    htmlFor={id}
    className="block text-sm font-medium"
  >
    {label}

    {required && (
      <span className="ml-1 text-red-500">*</span>
    )}
  </label>
)}

      {children}

      {description && (
        <p
          id={descriptionId}
          className="text-sm text-gray-500"
        >
          {description}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className="text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}