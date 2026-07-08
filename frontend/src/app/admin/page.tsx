"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, User } from "lucide-react";
import { adminLogin } from "@/lib/api";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { token } = await adminLogin(username, password);
      localStorage.setItem("dps-admin-token", token);
      router.push("/admin/dashboard");
    } catch {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-charcoal px-5">
      <form onSubmit={handleSubmit} className="glass w-full max-w-sm rounded-3xl p-8 shadow-soft">
        <div className="mx-auto mb-2 h-16 w-16 relative">
          <Image src="/brand/logo-mark.png" alt="Divya Photo Studio" fill className="object-contain" />
        </div>
        <h1 className="text-center font-display text-2xl text-warmwhite">
          Divya <span className="text-gold">Admin</span>
        </h1>
        <p className="mt-1 text-center text-sm text-warmwhite/60">Sign in to manage bookings and content.</p>

        <label className="mt-6 block text-sm text-warmwhite/80">
          Username
          <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-gold/30 px-3 py-2.5">
            <User size={16} className="text-gold" />
            <input value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full bg-transparent text-sm text-warmwhite outline-none" />
          </div>
        </label>

        <label className="mt-4 block text-sm text-warmwhite/80">
          Password
          <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-gold/30 px-3 py-2.5">
            <Lock size={16} className="text-gold" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-transparent text-sm text-warmwhite outline-none" />
          </div>
        </label>

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-gold-gradient py-3 text-sm font-semibold text-charcoal disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>

        <p className="mt-4 text-center text-xs text-warmwhite/40">
          Default credentials are set during backend setup — see README.md
        </p>
      </form>
    </main>
  );
}
