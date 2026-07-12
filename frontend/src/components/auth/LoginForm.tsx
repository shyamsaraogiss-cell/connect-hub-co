"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        setLoading(false);
        return;
      }

      login(result.user, result.token);

      switch (result.user.role) {
        case "FOUNDER":
          router.push("/dashboard");
          break;

        case "ADMIN":
          router.push("/admin");
          break;

        case "CUSTOMER":
          router.push("/customer");
          break;

        case "RELIGIOUS_PARTNER":
          router.push("/partner");
          break;

        default:
          router.push("/");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to login.");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full rounded border p-3"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full rounded border p-3"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-blue-600 py-3 text-white"
      >
        {loading ? "Signing In..." : "Login"}
      </button>
    </form>
  );
}