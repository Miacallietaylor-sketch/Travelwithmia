import { site } from "@/lib/site";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-prose">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink">
          {title}
        </h1>
        <p className="mt-2 text-sm text-charcoal/70">Last updated: {updated}</p>
        <div className="mt-8 rounded-xl border border-dashed border-gold/60 bg-beige/40 p-4 text-sm text-charcoal">
          <strong className="text-gold-ink">Placeholder notice:</strong> This is
          template wording for {site.legal.tradingName}. Have it reviewed by a
          qualified professional and replace all bracketed placeholders with
          genuine details before publishing.
        </div>
        <div className="prose-mia mt-8">{children}</div>
      </div>
    </div>
  );
}
