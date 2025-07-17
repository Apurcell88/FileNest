"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Registration successful!");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      toast.error(data.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-400 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Register
        </h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            className="w-full p-3 border border-gray-300 rounded bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="w-full p-3 border border-gray-300 rounded bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full p-3 border border-gray-300 rounded bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-medium transition"
          >
            Register
          </button>
          <button
            type="button"
            className="w-full border border-white text-white p-3 rounded hover:bg-white hover:text-blue-600 transition"
            onClick={() => router.push("/")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
