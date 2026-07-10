"use client";

import { useState } from "react";
import Link from "next/link";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { ConciergeNote } from "@/components/ConciergeNote";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = getBrowserSupabase();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!supabase) {
      // Graceful demo behaviour
      setSent(true);
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/account`,
    });
    if (error) setError(error.message);
    else setSent(true);
    setLoading(false);
  }

  return (
    <div className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-md">
        <p className="eyebrow">Account</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
          Reset your password
        </h1>
        {sent ? (
          <div className="mt-6">
            <ConciergeNote>
              If that email is registered, a time-limited reset link is on its
              way. Check your inbox (and spam, just in case).
            </ConciergeNote>
            <Link href="/account" className="btn-secondary mt-6">
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 grid gap-4" noValidate>
            <p className="text-sm text-charcoal">
              Enter your email and I&apos;ll send a secure, time-limited link to
              set a new password.
            </p>
            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                {error}
              </p>
            )}
            <div>
              <label htmlFor="reset-email" className="field-label">
                Email
              </label>
              <input
                id="reset-email"
                type="email"
                required
                autoComplete="email"
                className="field-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? "Sending…" : "Send reset link"}
            </button>
            <Link href="/account" className="text-center text-xs text-gold-ink underline">
              Back to login
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
