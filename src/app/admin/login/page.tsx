"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Login failed.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <p className="eyebrow text-center">Mia&apos;s back office</p>
        <h1 className="mt-2 text-center font-display text-3xl font-semibold text-ink">
          Admin sign in
        </h1>
        <form onSubmit={onSubmit} className="card mt-6 grid gap-4 p-6" noValidate>
          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
          <div>
            <label htmlFor="admin-code" className="field-label">
              Access code
            </label>
            <input
              id="admin-code"
              type="password"
              autoComplete="current-password"
              required
              className="field-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
          <p className="text-center text-xs text-charcoal/60">
            Default demo code is <code className="text-gold-ink">mia-admin</code>.
            Change it via the <code>ADMIN_ACCESS_CODE</code> environment variable
            before going live.
          </p>
        </form>
      </div>
    </div>
  );
}
