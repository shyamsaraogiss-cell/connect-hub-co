"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  customerSchema,
  CustomerFormData,
} from "../validation/customerSchema";

export function CustomerRegistrationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  });

  const onSubmit = async (
    data: CustomerFormData
  ) => {
    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      alert(result.message);

      console.log(result);

      reset();
    } catch (error) {
      console.error(error);

      alert("Customer registration failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-lg border bg-white p-6"
    >
      <div>
        <label className="mb-1 block font-medium">
          Full Name
        </label>

        <input
          {...register("fullName")}
          className="w-full rounded border p-2"
        />

        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block font-medium">
          Mobile
        </label>

        <input
          {...register("mobile")}
          className="w-full rounded border p-2"
        />

        {errors.mobile && (
          <p className="mt-1 text-sm text-red-600">
            {errors.mobile.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block font-medium">
          Purpose
        </label>

        <input
          {...register("purpose")}
          className="w-full rounded border p-2"
        />

        {errors.purpose && (
          <p className="mt-1 text-sm text-red-600">
            {errors.purpose.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting
          ? "Registering..."
          : "Register Customer"}
      </button>
    </form>
  );
}