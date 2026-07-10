/**
 * The MAHDI mark: a speech bubble whose interior holds a compass rose, with a
 * subtle paper-plane needle — chat + navigation + travel in one glyph.
 */
export function MahdiIcon({
  className = "",
  title = "MAHDI",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
    >
      {/* Speech bubble */}
      <path
        d="M20 4c9 0 16 5.9 16 13.2 0 7.3-7 13.2-16 13.2-1.7 0-3.4-.2-4.9-.6L7 34l1.2-6.1C5 25.4 4 21.6 4 17.2 4 9.9 11 4 20 4Z"
        fill="currentColor"
      />
      {/* Compass rose (paper-plane needle) */}
      <path
        d="M20 9.5 24.6 20 20 17.7 15.4 20 20 9.5Z"
        fill="#FBF8F3"
      />
      <path
        d="M20 26.5 15.4 20 20 22.3 24.6 20 20 26.5Z"
        fill="#FBF8F3"
        opacity="0.55"
      />
      <circle cx="20" cy="20" r="1.5" fill="#B08D57" />
    </svg>
  );
}
