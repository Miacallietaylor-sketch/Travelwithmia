"use client";

import { useState } from "react";
import type { Faq } from "@/data/faqs";

export function FAQAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-sand border-y border-sand">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.question}>
            <h3>
              <button
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="font-display text-lg font-semibold text-ink">
                  {faq.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-sand text-gold-ink transition-transform ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <path
                      d="M7 2v10M2 7h10"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            {isOpen && (
              <p className="prose-mia pb-5 pr-10 text-sm">{faq.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
