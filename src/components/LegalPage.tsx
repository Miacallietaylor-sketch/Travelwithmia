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
        <div className="prose-mia mt-8">{children}</div>
      </div>
    </div>
  );
}
