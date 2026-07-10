"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function StickyMobileCTA() {
  const pathname = usePathname();
  // Don't cover the quote form itself.
  if (pathname?.startsWith("/quote")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-paper/95 p-3 backdrop-blur lg:hidden">
      <div className="flex items-center gap-3">
        <Link href="/contact" className="btn-ghost flex-1">
          Ask Mia
        </Link>
        <Link href="/quote" className="btn-primary flex-[1.4]">
          Get a Quote
        </Link>
      </div>
    </div>
  );
}
