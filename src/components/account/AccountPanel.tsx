"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getBrowserSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { Dashboard } from "./Dashboard";
import { ConciergeNote } from "@/components/ConciergeNote";

type Mode = "login" | "signup";

export function AccountPanel() {
  const params = useSearchParams();
  const [mode, setMode] = useState<Mode>(
    params.get("intent") === "signup" ? "signup" : "login"
  );
  const [email, setEmail] = useState(params.get("email") ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const supabase = getBrowserSupabase();

  useEffect(() => {
    if (!supabase) {
      setChecked(true);
      return;
    }
    supabase.auth.getUser().then(({ data }) => {
      setSessionEmail(data.user?.email ?? null);
      setChecked(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setSessionEmail(session?.user?.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");
    if (!supabase) return;
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/account` },
        });
        if (error) throw error;
        setInfo(
          "Almost there — check your email to verify your account, then log in."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function google() {
    if (!supabase) return;
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/account` },
    });
    if (error) setError(error.message);
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSessionEmail(null);
  }

  // Signed in → dashboard
  if (sessionEmail) {
    return <Dashboard email={sessionEmail} onSignOut={signOut} />;
  }

  // Not configured → demo dashboard preview so the feature is visible locally
  if (checked && !isSupabaseConfigured) {
    return (
      <div>
        <div className="container-page pt-10">
          <div className="mx-auto max-w-3xl rounded-xl border border-dashed border-gold/60 bg-beige/40 p-4 text-sm text-charcoal">
            <strong className="text-gold-ink">Demo mode:</strong> Supabase
            isn&apos;t configured, so sign-up and login are disabled. Below is a
            preview of the account dashboard you&apos;d see once logged in. Add
            your keys to <code>.env.local</code> to enable real accounts.
          </div>
        </div>
        <Dashboard email="demo@travelwithmia.example" />
      </div>
    );
  }

  return (
    <div className="container-page py-14 sm:py-20">
      <div className="mx-auto grid max-w-4xl items-start gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Account</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-3 text-charcoal">
            Track your quotes, save a wishlist, store your travel documents and
            manage how I contact you — all in one place.
          </p>
          <div className="mt-6">
            <ConciergeNote>
              You never need an account to enquire. This just makes it easy to
              keep everything together.
            </ConciergeNote>
          </div>
        </div>

        <div className="card p-6">
          <div className="mb-5 grid grid-cols-2 rounded-full bg-paper-2 p-1">
            {(["login", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError("");
                  setInfo("");
                }}
                className={`rounded-full py-2 font-label text-sm font-semibold uppercase tracking-wide ${
                  mode === m ? "bg-gold text-paper" : "text-charcoal"
                }`}
              >
                {m === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
          {info && (
            <p className="mb-4 rounded-lg bg-beige px-3 py-2 text-sm text-gold-ink" role="status">
              {info}
            </p>
          )}

          <form onSubmit={onSubmit} className="grid gap-4" noValidate>
            <div>
              <label htmlFor="acc-email" className="field-label">
                Email
              </label>
              <input
                id="acc-email"
                type="email"
                autoComplete="email"
                required
                className="field-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="acc-pass" className="field-label">
                Password
              </label>
              <input
                id="acc-pass"
                type="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                required
                minLength={8}
                className="field-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {mode === "signup" && (
                <p className="mt-1 text-xs text-charcoal/60">
                  At least 8 characters. Passwords are securely hashed, never
                  stored as plain text.
                </p>
              )}
            </div>

            {mode === "login" && (
              <Link
                href="/account/reset"
                className="justify-self-end text-xs text-gold-ink underline"
              >
                Forgot your password?
              </Link>
            )}

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading
                ? "Please wait…"
                : mode === "signup"
                ? "Create account"
                : "Log in"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-charcoal/50">
            <span className="h-px flex-1 bg-sand" />
            or
            <span className="h-px flex-1 bg-sand" />
          </div>

          <button onClick={google} className="btn-ghost w-full">
            Continue with Google
          </button>

          <p className="mt-5 text-center text-xs text-charcoal/60">
            By continuing you agree to our{" "}
            <Link href="/terms" className="text-gold-ink underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-gold-ink underline">
              Privacy Policy
            </Link>
            . Accounts are for those aged 18 and over.
          </p>
        </div>
      </div>
    </div>
  );
}
