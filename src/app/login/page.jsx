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
    <div className="p-6 max-w-md mx-auto h-screen pt-8 bg-gradient-to-r from-blue-900  to-blue-400">
      <h1 className="text-3xl text-white font-bold mb-6 text-center">
        Sign-in
      </h1>
      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          className="w-full p-2 border rounded text-white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded text-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>
        <button
          className="w-full border border-white text-white p-2 rounded hover:bg-white hover:text-blue-600 transition"
          onClick={() => router.push("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
