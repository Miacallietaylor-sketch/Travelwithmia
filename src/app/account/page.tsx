import { Suspense } from "react";
import type { Metadata } from "next";
import { AccountPanel } from "@/components/account/AccountPanel";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Account",
    description:
      "Sign in or create a free account to track your quotes, save a wishlist and store your travel documents.",
    path: "/account",
  }),
  robots: { index: false, follow: true },
};

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-20 text-center text-charcoal">
          Loading…
        </div>
      }
    >
      <AccountPanel />
    </Suspense>
  );
}
