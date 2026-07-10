import "server-only";
import type { EmailProvider, EmailMessage } from "./types";

/** Resend transport via its REST API (no SDK dependency needed). */
export function createResendProvider(apiKey: string, from: string): EmailProvider {
  return {
    name: "resend",
    async send(message: EmailMessage) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            authorization: `Bearer ${apiKey}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            from,
            to: message.to,
            subject: message.subject,
            html: message.html,
            text: message.text,
            reply_to: message.replyTo,
          }),
        });
        if (!res.ok) {
          const detail = await res.text().catch(() => "");
          return { ok: false, error: `Resend ${res.status}: ${detail.slice(0, 160)}` };
        }
        const data = (await res.json()) as { id?: string };
        return { ok: true, id: data.id };
      } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : "send failed" };
      }
    },
  };
}
