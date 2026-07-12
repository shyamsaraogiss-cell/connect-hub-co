import Select from "react-select";
import {
  Controller,
  Control,
  FieldValues,
  Path,
} from "react-hook-form";

import { FormField } from "./FormField";

export interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectFieldProps<T extends FieldValues> {
  id: string;
  name: Path<T>;
  label: string;

  control: Control<T>;

  options: MultiSelectOption[];

  placeholder?: string;

  error?: string;

  description?: string;

  required?: boolean;

  isDisabled?: boolean;
}

export function MultiSelectField<T extends FieldValues>({
  id,
  name,
  label,
  control,
  options,
  placeholder = "Select...",
  error,
  description,
  required = false,
  isDisabled = false,
}: MultiSelectFieldProps<T>) {
  return (
    <FormField
      id={id}
      label={label}
      required={required}
      error={error}
      description={description}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            inputId={id}
            isMulti
            options={options}
            placeholder={placeholder}
            isDisabled={isDisabled}
            value={options.filter((option) =>
              Array.isArray(field.value)
                ? field.value.includes(option.value)
                : false
            )}
            onChange={(selectedOptions) => {
              field.onChange(
                selectedOptions.map((option) => option.value)
              );
            }}
            onBlur={field.onBlur}
            classNamePrefix="react-select"
          />
        )}
      />
    </FormField>
  );
}