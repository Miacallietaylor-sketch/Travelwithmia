export function PageHeader({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`container-page pt-14 pb-8 sm:pt-20 ${
        align === "center" ? "text-center" : ""
      }`}
    >
      <div className={align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 text-lg text-charcoal">{intro}</p>
        )}
      </div>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          {title}
        </h2>
        {intro && <p className="mt-3 text-charcoal">{intro}</p>}
      </div>
      {action}
    </div>
  );
}
