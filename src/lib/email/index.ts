import "server-only";
import type { EmailProvider, EmailMessage } from "./types";
import { createResendProvider } from "./resend";

function looksReal(v: string | undefined): v is string {
  return !!v && v.length > 8 && !v.startsWith("your-");
}

const providerName = (process.env.EMAIL_PROVIDER ?? "resend").toLowerCase();
const resendKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.EMAIL_FROM_ADDRESS ?? "MAHDI <onboarding@resend.dev>";

export const isEmailConfigured = looksReal(resendKey);

/** Returns a live email provider, or a log-only fallback for local/dev. */
export function getEmailProvider(): EmailProvider {
  if (providerName === "resend" && looksReal(resendKey)) {
    return createResendProvider(resendKey, fromAddress);
  }
  return {
    name: "log",
    async send(message: EmailMessage) {
      // No PII in logs — subject + recipient domain only.
      const domain = message.to.split("@")[1] ?? "unknown";
      console.info(
        `[email:log] would send "${message.subject}" to …@${domain} (email not configured)`
      );
      return { ok: true, id: "log-noop" };
    },
  };
}

export { fromAddress };
