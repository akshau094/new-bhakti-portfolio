"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "bhaktishete@gmail.com" && password === "bhakti@ak094") {
      // For demo purposes, we'll use a simple session flag in localStorage
      localStorage.setItem("isAdmin", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-2xl border border-zinc-100 bg-zinc-50/50 p-8 shadow-xl"
      >
        <h1 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900">Admin Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-zinc-500">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
              placeholder="bhaktishete@gmail.com"
              required
            />
          </div>
          
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-zinc-500">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-green-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-xs font-semibold text-red-500">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-zinc-900 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-zinc-800"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}
