"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { holidayTypes } from "@/data/holidayTypes";
import { ConciergeNote } from "./ConciergeNote";

type Errors = Record<string, string>;

const steps = ["Holiday type", "Trip details", "About you"] as const;

export function QuoteForm() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const [form, setForm] = useState({
    holidayType: params.get("type") ?? "",
    destination: params.get("destination") ?? "",
    departDate: "",
    returnDate: "",
    flexibleDates: false,
    adults: 2,
    children: 0,
    budget: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
    agreePrivacy: false,
    marketingEmail: false,
    marketingSms: false,
    marketingCall: false,
  });

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validateStep(current: number): boolean {
    const e: Errors = {};
    if (current === 0 && !form.holidayType) {
      e.holidayType = "Please choose a holiday type to continue.";
    }
    if (current === 1) {
      if (form.destination.trim().length < 2)
        e.destination = "Please tell me where you'd like to go.";
      if (form.adults < 1) e.adults = "At least one adult is travelling.";
      if (
        form.departDate &&
        form.returnDate &&
        form.returnDate < form.departDate
      )
        e.returnDate = "Return can't be before departure.";
    }
    if (current === 2) {
      if (!form.budget.trim())
        e.budget = "A rough budget helps me tailor options.";
      if (form.name.trim().length < 2) e.name = "Please tell me your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = "Please enter a valid email address.";
      if (!form.agreePrivacy)
        e.agreePrivacy =
          "Please agree to the Privacy Policy so I can respond to you.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, steps.length - 1));
  }
  function back() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(2)) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "quote-form",
          utmSource: params.get("utm_source") ?? "",
          utmMedium: params.get("utm_medium") ?? "",
          utmCampaign: params.get("utm_campaign") ?? "",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.fieldErrors) {
          const fe: Errors = {};
          for (const [k, v] of Object.entries(data.fieldErrors)) {
            fe[k] = Array.isArray(v) ? String(v[0]) : String(v);
          }
          setErrors(fe);
        } else {
          setErrors({ form: data.error ?? "Something went wrong." });
        }
        setSubmitting(false);
        return;
      }
      setDone(true);
    } catch {
      setErrors({ form: "Network error. Please try again." });
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-paper">
          <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 12.5l4.5 4.5L19 7"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="font-display text-3xl font-semibold text-ink">
          Thank you — it&apos;s with me now.
        </h2>
        <p className="mt-3 text-charcoal">
          I&apos;ll personally review your enquiry and come back to you, usually
          within one working day.
        </p>
        <div className="mt-8">
          <ConciergeNote>
            Got it, {form.name.split(" ")[0] || "there"}. Leave the rest with me
            — I&apos;m already thinking about where to send you.
          </ConciergeNote>
        </div>
        <div className="mt-8 rounded-2xl border border-sand bg-paper-2 p-6 text-left">
          <h3 className="font-display text-lg font-semibold text-ink">
            Want to track this quote?
          </h3>
          <p className="mt-1 text-sm text-charcoal">
            Create a free account to follow your quote&apos;s status, save a
            wishlist and store your travel documents. Totally optional.
          </p>
          <Link
            href={`/account?intent=signup&email=${encodeURIComponent(form.email)}`}
            className="btn-secondary mt-4"
          >
            Create my account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="mx-auto max-w-2xl">
      {/* Progress */}
      <ol className="mb-8 flex items-center gap-2" aria-label="Progress">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-label text-sm font-semibold ${
                i <= step
                  ? "bg-gold text-paper"
                  : "border border-sand text-charcoal/50"
              }`}
              aria-current={i === step ? "step" : undefined}
            >
              {i + 1}
            </span>
            <span
              className={`hidden text-sm sm:block ${
                i === step ? "font-semibold text-ink" : "text-charcoal/60"
              }`}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <span
                className={`h-px flex-1 ${i < step ? "bg-gold" : "bg-sand"}`}
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>

      {errors.form && (
        <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {errors.form}
        </p>
      )}

      {/* STEP 1 — holiday type */}
      {step === 0 && (
        <fieldset>
          <legend className="mb-1 font-display text-2xl font-semibold text-ink">
            What kind of holiday?
          </legend>
          <p className="mb-5 text-sm text-charcoal">
            Pick the closest match — we can refine it together.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {holidayTypes.map((t) => {
              const selected = form.holidayType === t.slug;
              return (
                <button
                  type="button"
                  key={t.slug}
                  onClick={() => set("holidayType", t.slug)}
                  aria-pressed={selected}
                  className={`rounded-xl border px-3 py-4 text-center transition-colors ${
                    selected
                      ? "border-gold bg-beige"
                      : "border-sand hover:border-gold/60"
                  }`}
                >
                  <span className="block font-label text-sm font-semibold text-ink">
                    {t.name}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.holidayType && (
            <p className="field-error" role="alert">
              {errors.holidayType}
            </p>
          )}
        </fieldset>
      )}

      {/* STEP 2 — details */}
      {step === 1 && (
        <fieldset className="grid gap-5">
          <legend className="mb-1 font-display text-2xl font-semibold text-ink">
            Where and when?
          </legend>
          <div>
            <label htmlFor="destination" className="field-label">
              Destination or idea *
            </label>
            <input
              id="destination"
              className="field-input"
              placeholder="e.g. Greece, a Caribbean cruise, or 'somewhere warm in October'"
              value={form.destination}
              onChange={(e) => set("destination", e.target.value)}
              aria-invalid={!!errors.destination}
              aria-describedby={errors.destination ? "err-destination" : undefined}
            />
            {errors.destination && (
              <p id="err-destination" className="field-error" role="alert">
                {errors.destination}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="departDate" className="field-label">
                Departing (approx.)
              </label>
              <input
                id="departDate"
                type="date"
                className="field-input"
                value={form.departDate}
                onChange={(e) => set("departDate", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="returnDate" className="field-label">
                Returning (approx.)
              </label>
              <input
                id="returnDate"
                type="date"
                className="field-input"
                value={form.returnDate}
                onChange={(e) => set("returnDate", e.target.value)}
                aria-invalid={!!errors.returnDate}
                aria-describedby={errors.returnDate ? "err-return" : undefined}
              />
              {errors.returnDate && (
                <p id="err-return" className="field-error" role="alert">
                  {errors.returnDate}
                </p>
              )}
            </div>
          </div>

          <label className="flex items-center gap-2.5 text-sm text-charcoal">
            <input
              type="checkbox"
              className="h-4 w-4 accent-gold"
              checked={form.flexibleDates}
              onChange={(e) => set("flexibleDates", e.target.checked)}
            />
            My dates are flexible — find me the best value.
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="adults" className="field-label">
                Adults *
              </label>
              <input
                id="adults"
                type="number"
                min={1}
                max={20}
                className="field-input"
                value={form.adults}
                onChange={(e) => set("adults", Number(e.target.value))}
                aria-invalid={!!errors.adults}
                aria-describedby={errors.adults ? "err-adults" : undefined}
              />
              {errors.adults && (
                <p id="err-adults" className="field-error" role="alert">
                  {errors.adults}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="children" className="field-label">
                Children
              </label>
              <input
                id="children"
                type="number"
                min={0}
                max={20}
                className="field-input"
                value={form.children}
                onChange={(e) => set("children", Number(e.target.value))}
              />
            </div>
          </div>
        </fieldset>
      )}

      {/* STEP 3 — about you + consent */}
      {step === 2 && (
        <fieldset className="grid gap-5">
          <legend className="mb-1 font-display text-2xl font-semibold text-ink">
            Almost there.
          </legend>
          <div>
            <label htmlFor="budget" className="field-label">
              Rough budget *
            </label>
            <input
              id="budget"
              className="field-input"
              placeholder="e.g. £2,000 total, or £1,000pp"
              value={form.budget}
              onChange={(e) => set("budget", e.target.value)}
              aria-invalid={!!errors.budget}
              aria-describedby={errors.budget ? "err-budget" : undefined}
            />
            {errors.budget && (
              <p id="err-budget" className="field-error" role="alert">
                {errors.budget}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="field-label">
                Your name *
              </label>
              <input
                id="name"
                autoComplete="name"
                className="field-input"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "err-name" : undefined}
              />
              {errors.name && (
                <p id="err-name" className="field-error" role="alert">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="field-label">
                Email *
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="field-input"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "err-email" : undefined}
              />
              {errors.email && (
                <p id="err-email" className="field-error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="field-label">
              Phone (optional)
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              className="field-input"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="notes" className="field-label">
              Anything else I should know? (optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              className="field-input"
              placeholder="Special occasion, must-haves, accessibility needs, dream hotels…"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
            />
          </div>

          {/* Consent — separate, unticked, marketing broken out per channel */}
          <div className="rounded-2xl border border-sand bg-paper-2 p-5">
            <p className="font-label text-xs font-semibold uppercase tracking-wide text-charcoal">
              Your consent
            </p>
            <label className="mt-3 flex items-start gap-3 text-sm text-charcoal">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 accent-gold"
                checked={form.agreePrivacy}
                onChange={(e) => set("agreePrivacy", e.target.checked)}
                aria-invalid={!!errors.agreePrivacy}
                aria-describedby={errors.agreePrivacy ? "err-privacy" : undefined}
              />
              <span>
                I agree to the{" "}
                <Link href="/privacy" className="text-gold-ink underline" target="_blank">
                  Privacy Policy
                </Link>{" "}
                and to Mia contacting me about this enquiry. *
              </span>
            </label>
            {errors.agreePrivacy && (
              <p id="err-privacy" className="field-error" role="alert">
                {errors.agreePrivacy}
              </p>
            )}

            <p className="mt-4 text-xs text-charcoal/70">
              Optional — I&apos;d love to send occasional inspiration and deals.
              Choose the channels you&apos;re happy with (none are pre-ticked):
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              <label className="flex items-center gap-2 text-sm text-charcoal">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-gold"
                  checked={form.marketingEmail}
                  onChange={(e) => set("marketingEmail", e.target.checked)}
                />
                Email
              </label>
              <label className="flex items-center gap-2 text-sm text-charcoal">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-gold"
                  checked={form.marketingSms}
                  onChange={(e) => set("marketingSms", e.target.checked)}
                />
                SMS / WhatsApp
              </label>
              <label className="flex items-center gap-2 text-sm text-charcoal">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-gold"
                  checked={form.marketingCall}
                  onChange={(e) => set("marketingCall", e.target.checked)}
                />
                Phone call
              </label>
            </div>
          </div>
        </fieldset>
      )}

      {/* Nav */}
      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button type="button" onClick={back} className="btn-ghost">
            Back
          </button>
        ) : (
          <span />
        )}
        {step < steps.length - 1 ? (
          <button type="button" onClick={next} className="btn-primary">
            Continue
          </button>
        ) : (
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? "Sending…" : "Send my enquiry"}
          </button>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-charcoal/60">
        No account needed. You can submit as a guest — I&apos;ll invite you to
        create one afterwards to track your quote.
      </p>
    </form>
  );
}
