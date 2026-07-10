"use client";

import dynamic from "next/dynamic";

/**
 * MAHDI is a client-only floating widget. Loading it with `ssr: false` keeps it
 * out of the server render entirely, so it can never cause a hydration
 * mismatch and never blocks first paint of the page content.
 */
const Mahdi = dynamic(() => import("./Mahdi").then((m) => m.Mahdi), {
  ssr: false,
});

export function MahdiMount() {
  return <Mahdi />;
}
