export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

/** Replaceable email transport. Default implementation is Resend. */
export interface EmailProvider {
  readonly name: string;
  send(message: EmailMessage): Promise<{ ok: boolean; id?: string; error?: string }>;
}
