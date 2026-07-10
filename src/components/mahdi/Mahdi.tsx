"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MahdiIcon } from "./MahdiIcon";
import {
  quickActions,
  WELCOME_MESSAGE,
  FOOTER_DISCLAIMER,
  INSPIRATION_DISCLAIMER,
  mahdiContact,
  whatsappLink,
  emailLink,
  type QuickAction,
} from "@/lib/mahdi/config";
import {
  quoteSteps,
  discoveryQuestions,
  suggestDestinations,
  type Answers,
  type QuoteStep,
} from "./flows";
import { track } from "@/lib/analytics";

type ChatMsg = { id: string; from: "mahdi" | "user"; text: string };
type Mode =
  | "menu"
  | "quote"
  | "discovery"
  | "discoveryResults"
  | "review"
  | "chat"
  | "handover"
  | "submitted";

const DRAFT_KEY = "mahdi-draft";
let msgSeq = 0;
const uid = () => `m${++msgSeq}`;

export function Mahdi() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("menu");
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [discoIndex, setDiscoIndex] = useState(0);
  const [input, setInput] = useState("");
  const [enquiryConsent, setEnquiryConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const aiHistory = useRef<{ role: "user" | "assistant"; content: string }[]>([]);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const pushMahdi = useCallback((text: string) => {
    setMessages((m) => [...m, { id: uid(), from: "mahdi", text }]);
  }, []);
  const pushUser = useCallback((text: string) => {
    setMessages((m) => [...m, { id: uid(), from: "user", text }]);
  }, []);

  // Restore an unfinished draft (session-only, not stored indefinitely).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) setAnswers(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (Object.keys(answers).length) {
      try {
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify(answers));
      } catch {
        /* ignore */
      }
    }
  }, [answers]);

  // Seed the welcome message on first open.
  useEffect(() => {
    if (open && messages.length === 0) {
      pushMahdi(WELCOME_MESSAGE);
    }
  }, [open, messages.length, pushMahdi]);

  // Autoscroll to newest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, mode]);

  // Escape closes; focus management.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => {
      (panelRef.current?.querySelector<HTMLElement>("[data-autofocus]") ?? inputRef.current)?.focus();
    }, 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mode]);

  function openChat() {
    setOpen(true);
    track("mahdi_opened");
  }
  function close() {
    setOpen(false);
    track("mahdi_closed");
    launcherRef.current?.focus();
  }
  function resetChat() {
    setMessages([]);
    setAnswers({});
    setStepIndex(0);
    setDiscoIndex(0);
    setMode("menu");
    setInput("");
    setEnquiryConsent(false);
    setMarketingConsent(false);
    setReference("");
    setError("");
    aiHistory.current = [];
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
    pushMahdi(WELCOME_MESSAGE);
  }

  // ── Quick actions ──
  function onQuickAction(qa: QuickAction) {
    track("quick_action_selected", qa.id);
    pushUser(qa.label);
    if (qa.kind === "quote") {
      const next = qa.seed ? { ...answers, holidayStyle: qa.seed } : answers;
      setAnswers(next);
      setMode("quote");
      setStepIndex(0);
      track("enquiry_started", "quote");
      pushMahdi("Wonderful — let's put your requirements together for Mia. I'll ask a few quick questions.");
      askQuoteStep(0, next);
    } else if (qa.kind === "discovery") {
      setMode("discovery");
      setDiscoIndex(0);
      track("enquiry_started", "discovery");
      pushMahdi("Let's find somewhere that fits you. A few quick questions first.");
      pushMahdi(discoveryQuestions[0].prompt);
    } else if (qa.kind === "handover") {
      setMode("handover");
      track("human_handover_clicked", qa.id);
      pushMahdi("Prefer to speak to Mia? No problem — I can pass your details over, or you can reach her directly below. She's the one real person who books and protects every trip.");
    }
  }

  function askQuoteStep(index: number, current: Answers) {
    let i = index;
    while (i < quoteSteps.length && quoteSteps[i].skipIf?.(current)) i++;
    if (i >= quoteSteps.length) {
      setMode("review");
      pushMahdi("Perfect — I've organised everything for Mia. Please check the summary below before sending your enquiry.");
      return;
    }
    setStepIndex(i);
    pushMahdi(quoteSteps[i].prompt);
  }

  function submitQuoteStep(value: string) {
    const step = quoteSteps[stepIndex];
    const v = value.trim();
    if (!step.optional && step.type !== "consent" && !v) {
      setError("Please answer to continue, or choose an option.");
      return;
    }
    if (step.validate) {
      const err = step.validate(v, answers);
      if (err) {
        setError(err);
        return;
      }
    }
    setError("");
    const next = { ...answers, [step.key]: v };
    setAnswers(next);
    if (v) pushUser(v);
    else pushUser("(skip)");
    track("enquiry_step_completed", `q${stepIndex + 1}`);
    setInput("");
    askQuoteStep(stepIndex + 1, next);
  }

  function submitDiscovery(value: string) {
    const q = discoveryQuestions[discoIndex];
    const v = value.trim();
    if (!q.optional && !v) {
      setError("Please answer, or pick an option.");
      return;
    }
    setError("");
    const next = { ...answers, [`disco_${q.key}`]: v };
    setAnswers(next);
    pushUser(v || "(skip)");
    setInput("");
    const ni = discoIndex + 1;
    if (ni >= discoveryQuestions.length) {
      showDiscoveryResults(next);
    } else {
      setDiscoIndex(ni);
      pushMahdi(discoveryQuestions[ni].prompt);
    }
  }

  function showDiscoveryResults(a: Answers) {
    const mapped: Answers = {
      vibe: a.disco_vibe,
      weather: a.disco_weather,
      haul: a.disco_haul,
      avoid: a.disco_avoid,
    };
    const picks = suggestDestinations(mapped);
    const text = picks
      .map(
        (s) =>
          `📍 ${s.name}\n• Why: ${s.why}\n• Flights: ${s.flightDuration}\n• Climate: ${s.climate}\n• Best for: ${s.bestFor}\n• Worth knowing: ${s.consideration}`
      )
      .join("\n\n");
    pushMahdi(`Here are a few ideas that could suit you:\n\n${text}\n\n${INSPIRATION_DISCLAIMER}\n\nWould you like Mia to search for current packages and availability?`);
    setMode("discoveryResults");
  }

  // ── Free-form AI chat ──
  async function sendChat(text: string) {
    const v = text.trim();
    if (!v) return;
    pushUser(v);
    setInput("");
    aiHistory.current.push({ role: "user", content: v });
    aiHistory.current = aiHistory.current.slice(-20);
    const id = uid();
    setMessages((m) => [...m, { id, from: "mahdi", text: "…" }]);
    setBusy(true);
    try {
      const res = await fetch("/api/mahdi/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: aiHistory.current }),
      });
      if (!res.ok || !res.body) throw new Error("bad response");
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMessages((m) => m.map((x) => (x.id === id ? { ...x, text: acc } : x)));
      }
      aiHistory.current.push({ role: "assistant", content: acc });
    } catch {
      track("mahdi_error", "chat");
      setMessages((m) =>
        m.map((x) =>
          x.id === id
            ? {
                ...x,
                text: "MAHDI is taking a short break, but Mia can still help. Use the quick actions to send a holiday enquiry, or choose “Speak to Mia”.",
              }
            : x
        )
      );
    } finally {
      setBusy(false);
    }
  }

  // ── Submit enquiry ──
  async function sendToMia() {
    if (!enquiryConsent) {
      setError("Please tick the enquiry consent box so Mia can respond.");
      return;
    }
    setError("");
    setBusy(true);
    const summary = summarise(answers);
    try {
      const res = await fetch("/api/mahdi/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiryType: answers.holidayStyle || "Holiday enquiry",
          destination: answers.destination || "",
          departureAirport: answers.departureAirport || "",
          departureDate: answers.departureDate || "",
          dateFlexibility: answers.dateFlexibility || "",
          nights: answers.nights || "",
          adults: Number(answers.adults || "2"),
          children: Number(answers.children || "0"),
          childrenAges: answers.childrenAges || "",
          budget: answers.budget || "",
          boardBasis: answers.boardBasis || "",
          holidayStyle: answers.holidayStyle || "",
          hotelPreference: answers.hotelPreference || "",
          requirements: answers.requirements || "",
          accessibilityRequirements: answers.accessibilityRequirements || "",
          customerName: answers.customerName || "",
          email: answers.email || "",
          phone: answers.phone || "",
          preferredContactMethod: answers.preferredContactMethod || "Email",
          bestContactTime: answers.bestContactTime || "",
          enquiryConsent,
          marketingConsent,
          conversationSummary: summary,
          company: honeypot,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        track("mahdi_error", "submit");
        setError(data.error ?? "Something went wrong. Please try again or contact Mia directly.");
        setBusy(false);
        return;
      }
      setReference(data.reference);
      setMode("submitted");
      track("enquiry_submitted");
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
    } catch {
      track("mahdi_error", "network");
      setError("Network problem. Please try again, or use “Speak to Mia”.");
    } finally {
      setBusy(false);
    }
  }

  const currentStep: QuoteStep | undefined =
    mode === "quote" ? quoteSteps[stepIndex] : undefined;

  // Keep MAHDI off the internal admin area.
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* Launcher */}
      {!open && (
        <div className="fixed bottom-20 right-4 z-[85] flex flex-col items-end gap-2 lg:bottom-6">
          <span className="hidden rounded-full bg-paper px-3 py-1.5 text-xs font-medium text-charcoal shadow-card sm:block">
            Planning a holiday?
          </span>
          <button
            ref={launcherRef}
            onClick={openChat}
            aria-label="Ask MAHDI — open the AI holiday assistant"
            className="group flex items-center gap-2 rounded-full bg-ink py-3 pl-3 pr-5 text-paper shadow-lift transition-transform hover:scale-[1.03] motion-reduce:hover:scale-100"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink">
              <MahdiIcon className="h-6 w-6" />
            </span>
            <span className="font-label text-sm font-semibold uppercase tracking-wide">
              Ask MAHDI
            </span>
          </button>
        </div>
      )}

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="MAHDI, the AI holiday assistant"
          className="fixed inset-x-0 bottom-0 z-[90] flex h-[92dvh] flex-col overflow-hidden rounded-t-2xl border border-sand bg-paper shadow-lift sm:inset-x-auto sm:bottom-6 sm:right-4 sm:h-[640px] sm:max-h-[85vh] sm:w-[400px] sm:rounded-2xl"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-sand bg-ink px-4 py-3 text-paper">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold text-ink">
              <MahdiIcon className="h-7 w-7" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-semibold leading-tight">Meet MAHDI</p>
              <p className="truncate text-[11px] text-paper/70">
                My AI Holiday &amp; Destination Intelligence
              </p>
            </div>
            <button
              onClick={resetChat}
              className="rounded-lg p-1.5 text-paper/70 hover:bg-paper/10 hover:text-paper"
              aria-label="Reset chat"
              title="Reset chat"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M15.5 6.5A6 6 0 1 0 16 10" strokeLinecap="round" />
                <path d="M16 3v4h-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={close}
              className="rounded-lg p-1.5 text-paper/70 hover:bg-paper/10 hover:text-paper"
              aria-label="Close MAHDI"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            aria-live="polite"
            aria-atomic="false"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={m.from === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={
                    m.from === "user"
                      ? "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-gold px-3.5 py-2.5 text-sm text-paper"
                      : "max-w-[88%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-paper-2 px-3.5 py-2.5 text-sm text-ink"
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Menu quick actions */}
            {mode === "menu" && (
              <div className="flex flex-wrap gap-2 pt-1">
                {quickActions.map((qa) => (
                  <button
                    key={qa.id}
                    data-autofocus={qa.id === "find" ? true : undefined}
                    onClick={() => onQuickAction(qa)}
                    className="rounded-full border border-gold bg-paper px-3 py-1.5 text-xs font-semibold text-gold-ink hover:bg-beige"
                  >
                    {qa.label}
                  </button>
                ))}
              </div>
            )}

            {/* Discovery results next steps */}
            {mode === "discoveryResults" && (
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => {
                    setMode("quote");
                    setStepIndex(0);
                    pushMahdi("Great — let's get your details so Mia can search live packages.");
                    askQuoteStep(0, answers);
                  }}
                  className="btn-primary px-4 py-2 text-xs"
                >
                  Yes — get a quote
                </button>
                <button
                  onClick={() => {
                    setMode("chat");
                    pushMahdi("Sure — ask me anything about these ideas or holidays in general.");
                  }}
                  className="btn-ghost px-4 py-2 text-xs"
                >
                  Ask a question
                </button>
              </div>
            )}

            {/* Review + consent */}
            {mode === "review" && (
              <ReviewCard
                answers={answers}
                enquiryConsent={enquiryConsent}
                marketingConsent={marketingConsent}
                setEnquiryConsent={setEnquiryConsent}
                setMarketingConsent={setMarketingConsent}
                honeypot={honeypot}
                setHoneypot={setHoneypot}
                onSend={sendToMia}
                onEdit={() => {
                  setMode("quote");
                  setStepIndex(0);
                  pushMahdi("No problem — let's run back through your answers.");
                  askQuoteStep(0, answers);
                }}
                onRestart={resetChat}
                busy={busy}
              />
            )}

            {/* Handover */}
            {mode === "handover" && <HandoverCard onForm={() => {
              setMode("quote");
              setStepIndex(0);
              askQuoteStep(0, answers);
            }} />}

            {/* Submitted */}
            {mode === "submitted" && (
              <div className="rounded-2xl border border-sand bg-paper-2 p-4">
                <p className="font-display text-lg font-semibold text-ink">Enquiry sent 🎉</p>
                <p className="mt-1 text-sm text-charcoal">
                  Your enquiry has been sent to Mia. She&apos;ll review your requirements and contact you using your preferred method.
                </p>
                <p className="mt-2 text-sm">
                  Reference: <strong className="text-gold-ink">{reference}</strong>
                </p>
                <p className="mt-2 text-xs text-charcoal/70">
                  No booking has been made yet. Mia verifies prices, availability, travel requirements and financial protection before any booking.
                </p>
                <button onClick={resetChat} className="btn-ghost mt-3 px-4 py-2 text-xs">
                  Start a new enquiry
                </button>
              </div>
            )}
          </div>

          {error && (
            <p className="border-t border-sand bg-red-50 px-4 py-2 text-xs text-red-700" role="alert">
              {error}
            </p>
          )}

          {/* Composer / step input */}
          <div className="border-t border-sand bg-paper px-3 py-3">
            {mode === "quote" && currentStep ? (
              <StepInput
                step={currentStep}
                value={input}
                setValue={setInput}
                onSubmit={submitQuoteStep}
                busy={busy}
                inputRef={inputRef}
              />
            ) : mode === "discovery" ? (
              <StepInput
                step={{ ...discoveryQuestions[discoIndex], type: discoveryQuestions[discoIndex].type } as unknown as QuoteStep}
                value={input}
                setValue={setInput}
                onSubmit={submitDiscovery}
                busy={busy}
                inputRef={inputRef}
              />
            ) : mode === "menu" || mode === "chat" || mode === "discoveryResults" || mode === "handover" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (mode !== "chat") setMode("chat");
                  sendChat(input);
                }}
                className="flex items-center gap-2"
              >
                <label htmlFor="mahdi-input" className="sr-only">
                  Type a message to MAHDI
                </label>
                <input
                  id="mahdi-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask MAHDI anything…"
                  className="field-input py-2.5 text-sm"
                  disabled={busy}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="btn-primary flex-shrink-0 px-4 py-2.5"
                  disabled={busy || !input.trim()}
                  aria-label="Send message"
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M3 10l14-6-6 14-2-6-6-2Z" fill="currentColor" />
                  </svg>
                </button>
              </form>
            ) : null}

            <p className="mt-2 text-center text-[10px] leading-tight text-charcoal/50">
              {FOOTER_DISCLAIMER}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// ── Sub-components ──

function StepInput({
  step,
  value,
  setValue,
  onSubmit,
  busy,
  inputRef,
}: {
  step: QuoteStep;
  value: string;
  setValue: (v: string) => void;
  onSubmit: (v: string) => void;
  busy: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  if (step.type === "chips" || step.type === "select") {
    return (
      <div className="flex flex-wrap gap-2">
        {step.options?.map((opt) => (
          <button
            key={opt}
            onClick={() => onSubmit(opt)}
            disabled={busy}
            className="rounded-full border border-gold bg-paper px-3 py-1.5 text-xs font-semibold text-gold-ink hover:bg-beige"
          >
            {opt}
          </button>
        ))}
        {step.optional && (
          <button
            onClick={() => onSubmit("")}
            className="rounded-full border border-sand px-3 py-1.5 text-xs text-charcoal hover:bg-beige"
          >
            Skip
          </button>
        )}
      </div>
    );
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
      }}
      className="flex items-center gap-2"
    >
      <label htmlFor="mahdi-step" className="sr-only">
        {step.prompt}
      </label>
      <input
        id="mahdi-step"
        ref={inputRef}
        data-autofocus
        type={step.type === "number" ? "number" : step.type === "date" ? "date" : "text"}
        inputMode={step.type === "number" ? "numeric" : undefined}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={step.placeholder ?? "Type your answer…"}
        className="field-input py-2.5 text-sm"
        disabled={busy}
        autoComplete="off"
      />
      {step.optional && (
        <button type="button" onClick={() => onSubmit("")} className="btn-ghost px-3 py-2.5 text-xs">
          Skip
        </button>
      )}
      <button type="submit" className="btn-primary flex-shrink-0 px-4 py-2.5 text-xs" disabled={busy}>
        Send
      </button>
    </form>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-3 py-1 text-sm">
      <span className="text-charcoal/60">{label}</span>
      <span className="text-right font-medium text-ink">{value}</span>
    </div>
  );
}

function ReviewCard({
  answers,
  enquiryConsent,
  marketingConsent,
  setEnquiryConsent,
  setMarketingConsent,
  honeypot,
  setHoneypot,
  onSend,
  onEdit,
  onRestart,
  busy,
}: {
  answers: Answers;
  enquiryConsent: boolean;
  marketingConsent: boolean;
  setEnquiryConsent: (v: boolean) => void;
  setMarketingConsent: (v: boolean) => void;
  honeypot: string;
  setHoneypot: (v: string) => void;
  onSend: () => void;
  onEdit: () => void;
  onRestart: () => void;
  busy: boolean;
}) {
  const travellers = `${answers.adults || "?"} adult(s)${
    Number(answers.children || "0") ? `, ${answers.children} child(ren)` : ""
  }`;
  return (
    <div className="rounded-2xl border border-sand bg-paper-2 p-4">
      <p className="font-display text-base font-semibold text-ink">Your holiday enquiry</p>
      <div className="mt-2 divide-y divide-sand/70">
        <Row label="Destination" value={answers.destination || "Open to ideas"} />
        <Row label="Departure" value={answers.departureAirport} />
        <Row label="Dates" value={answers.departureDate} />
        <Row label="Flexibility" value={answers.dateFlexibility} />
        <Row label="Nights" value={answers.nights} />
        <Row label="Travellers" value={travellers} />
        <Row label="Budget" value={answers.budget} />
        <Row label="Board basis" value={answers.boardBasis} />
        <Row label="Holiday style" value={answers.holidayStyle} />
        <Row label="Hotel" value={answers.hotelPreference} />
        <Row label="Must-haves" value={answers.requirements} />
        <Row label="Accessibility" value={answers.accessibilityRequirements} />
        <Row label="Name" value={answers.customerName} />
        <Row label="Email" value={answers.email} />
        <Row label="Phone" value={answers.phone} />
        <Row label="Contact by" value={answers.preferredContactMethod} />
        <Row label="Best time" value={answers.bestContactTime} />
      </div>

      <p className="mt-3 text-xs text-charcoal/70">
        Travel With Mia will use the details you provide to respond to your enquiry.
        Marketing updates are optional and require separate consent. Please read our{" "}
        <Link href={mahdiContact.privacyUrl} className="text-gold-ink underline" target="_blank">
          Privacy Policy
        </Link>
        .
      </p>

      {/* Honeypot (hidden from users, visible to bots) */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <label className="mt-3 flex items-start gap-2 text-xs text-charcoal">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 accent-gold"
          checked={enquiryConsent}
          onChange={(e) => setEnquiryConsent(e.target.checked)}
        />
        <span>I agree for Mia to use these details to respond to my enquiry. *</span>
      </label>
      <label className="mt-2 flex items-start gap-2 text-xs text-charcoal">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 accent-gold"
          checked={marketingConsent}
          onChange={(e) => setMarketingConsent(e.target.checked)}
        />
        <span>Optional: email me occasional travel inspiration and deals. (Not ticked by default.)</span>
      </label>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={onSend} className="btn-primary px-4 py-2 text-xs" disabled={busy}>
          {busy ? "Sending…" : "Send to Mia"}
        </button>
        <button onClick={onEdit} className="btn-ghost px-4 py-2 text-xs" disabled={busy}>
          Edit my answers
        </button>
        <button onClick={onRestart} className="btn-ghost px-4 py-2 text-xs" disabled={busy}>
          Start again
        </button>
      </div>
    </div>
  );
}

function HandoverCard({ onForm }: { onForm: () => void }) {
  const wa = whatsappLink();
  const em = emailLink();
  return (
    <div className="rounded-2xl border border-sand bg-paper-2 p-4">
      <p className="font-display text-base font-semibold text-ink">Reach Mia directly</p>
      <div className="mt-3 grid gap-2">
        {wa ? (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-secondary px-4 py-2 text-xs">
            Message on WhatsApp
          </a>
        ) : (
          <p className="rounded-lg bg-beige/60 px-3 py-2 text-[11px] text-charcoal/70">
            WhatsApp link appears once Mia&apos;s number is configured.
          </p>
        )}
        {em ? (
          <a href={em} className="btn-secondary px-4 py-2 text-xs">
            Email Mia
          </a>
        ) : (
          <p className="rounded-lg bg-beige/60 px-3 py-2 text-[11px] text-charcoal/70">
            Email link appears once Mia&apos;s address is configured.
          </p>
        )}
        <button onClick={onForm} className="btn-primary px-4 py-2 text-xs">
          Send a holiday enquiry
        </button>
        <Link href="/contact" className="btn-ghost px-4 py-2 text-center text-xs">
          Request a callback
        </Link>
      </div>
    </div>
  );
}

/** Concise, non-transcript summary of the enquiry for Mia. */
function summarise(a: Answers): string {
  const parts = [
    a.destination && `Destination: ${a.destination}`,
    a.departureAirport && `From: ${a.departureAirport}`,
    a.departureDate && `When: ${a.departureDate} (${a.dateFlexibility || "flex n/a"})`,
    a.nights && `${a.nights} nights`,
    `${a.adults || "?"} adults, ${a.children || "0"} children${a.childrenAges ? ` (ages ${a.childrenAges})` : ""}`,
    a.budget && `Budget: ${a.budget}`,
    a.boardBasis && `Board: ${a.boardBasis}`,
    a.holidayStyle && `Style: ${a.holidayStyle}`,
    a.hotelPreference && `Hotel: ${a.hotelPreference}`,
    a.requirements && `Must-haves: ${a.requirements}`,
    a.accessibilityRequirements && `Accessibility: ${a.accessibilityRequirements}`,
    a.disco_vibe && `Discovery vibe: ${a.disco_vibe}`,
  ].filter(Boolean);
  return parts.join(". ");
}
