"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  LoginFormData,
} from "../validation/loginSchema";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch("/api/auth/login", {
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

// Redirect to Admin Dashboard
window.location.href = "/admin";
    } catch (error) {
      console.error(error);

      alert("Login failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-md space-y-6 rounded-lg border bg-white p-8 shadow"
    >
      <div>
        <h1 className="text-3xl font-bold">
          Sign In
        </h1>

        <p className="mt-2 text-gray-600">
          Login to Connect Hub Co.
        </p>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Email
        </label>

        <input
          type="email"
          {...register("email")}
          className="w-full rounded-md border px-4 py-3"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Password
        </label>

        <input
          type="password"
          {...register("password")}
          className="w-full rounded-md border px-4 py-3"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}