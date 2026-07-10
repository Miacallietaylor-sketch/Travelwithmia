"use client";

import { useState } from "react";

export function NewsletterCapture({
  source = "website",
  compact = false,
}: {
  source?: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent, source }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("done");
      setMessage("You're on the list. I'll be in touch with the good stuff.");
      setEmail("");
      setConsent(false);
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <p className="rounded-xl bg-beige px-4 py-3 text-sm text-gold-ink" role="status">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "" : "max-w-md"} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor={`nl-${source}`} className="sr-only">
            Email address
          </label>
          <input
            id={`nl-${source}`}
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field-input"
            aria-describedby={
              status === "error" ? `nl-err-${source}` : undefined
            }
          />
        </div>
        <button
          type="submit"
          className="btn-primary whitespace-nowrap"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Joining…" : "Join the list"}
        </button>
      </div>
      <label className="mt-3 flex items-start gap-2.5 text-xs text-charcoal">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 accent-gold"
        />
        <span>
          Yes, email me occasional travel inspiration and deals. I can
          unsubscribe any time. Not pre-ticked — your choice.
        </span>
      </label>
      {status === "error" && (
        <p id={`nl-err-${source}`} className="field-error" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
