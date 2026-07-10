/**
 * Human-readable enquiry reference, e.g. TWM-MAHDI-2026-000001.
 *
 * The sequence number is provided by the store (a Postgres sequence in
 * production, or a monotonic in-memory counter in the fallback). This keeps
 * references unique and readable without exposing internal IDs.
 */
export function formatReference(sequence: number, year = new Date().getFullYear()) {
  const padded = String(sequence).padStart(6, "0");
  return `TWM-MAHDI-${year}-${padded}`;
}
