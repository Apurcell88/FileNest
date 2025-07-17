"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Login successful!");
      router.push("/dashboard");
    } else {
      toast.error(data.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-400 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Sign In
        </h1>
        <form className="space-y-4" onSubmit={handleLogin}>
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
            Login
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

export default LoginPage;
