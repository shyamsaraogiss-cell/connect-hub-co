"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../../lib/auth";

export default function RegisterForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await register({
        fullName,
        email,
        password,
      });

      if (response.success) {
        alert("Registration Successful!");

        setFullName("");
        setEmail("");
        setMobile("");
        setPassword("");

        router.push("/login");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to the server.");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4">

      <div>
        <label className="block mb-1 font-medium">
          Full Name
        </label>

        <input
          type="text"
          placeholder="Enter your full name"
          className="w-full rounded-lg border p-3"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-lg border p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Mobile Number
        </label>

        <input
          type="tel"
          placeholder="Enter your mobile number"
          className="w-full rounded-lg border p-3"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Password
        </label>

        <input
          type="password"
          placeholder="Create a password"
          className="w-full rounded-lg border p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-green-600 p-3 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register"}
      </button>

    </form>
  );
}