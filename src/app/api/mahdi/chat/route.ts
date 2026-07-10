import { z } from "zod";
import { getAiProvider } from "@/lib/ai";
import { MAHDI_SYSTEM_PROMPT } from "@/lib/ai/prompt";
import { rateLimit, clientKey } from "@/lib/security/rateLimit";
import { isSameOrigin, tooLarge } from "@/lib/security/request";

export const runtime = "nodejs";

const MAX_BYTES = 32 * 1024;
const TIMEOUT_MS = 25_000;

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(4000),
});
const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(24),
});

const encoder = new TextEncoder();

/** Scripted fallback used when no AI key is configured or the provider fails. */
function fallbackText(): string {
  return "I'm MAHDI, Mia's AI holiday assistant. My live chat brain isn't switched on in this environment yet, but I can still help you plan.\n\nUse the quick actions to start a holiday quote or get destination inspiration — I'll organise everything and pass it to Mia, who personally books and protects every trip. You can also choose “Speak to Mia” to reach her directly.";
}

function streamString(text: string): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return new Response("Blocked.", { status: 403 });
  }
  if (tooLarge(request, MAX_BYTES)) {
    return new Response("Request too large.", { status: 413 });
  }

  const limit = rateLimit(`chat:${clientKey(request)}`, 20, 60_000);
  if (!limit.ok) {
    return new Response(
      "I'm getting a lot of questions right now — please wait a moment and try again.",
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid request.", { status: 400 });
  }
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return new Response("Invalid message format.", { status: 422 });
  }

  const provider = getAiProvider();
  if (!provider) {
    return new Response(streamString(fallbackText()), {
      headers: { "content-type": "text/plain; charset=utf-8", "x-mahdi-source": "fallback" },
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const stream = new ReadableStream<Uint8Array>({
    async start(ctrl) {
      try {
        let produced = false;
        for await (const chunk of provider.streamChat({
          system: MAHDI_SYSTEM_PROMPT,
          messages: parsed.data.messages,
          signal: controller.signal,
        })) {
          produced = true;
          ctrl.enqueue(encoder.encode(chunk));
        }
        if (!produced) ctrl.enqueue(encoder.encode(fallbackText()));
      } catch (err) {
        console.error("[mahdi:chat] provider error:", err instanceof Error ? err.message : "unknown");
        ctrl.enqueue(
          encoder.encode(
            "\n\nMAHDI is taking a short break, but Mia can still help. Please use the quick actions to send a holiday enquiry, or choose “Speak to Mia”."
          )
        );
      } finally {
        clearTimeout(timeout);
        ctrl.close();
      }
    },
    cancel() {
      clearTimeout(timeout);
      controller.abort();
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-mahdi-source": provider.name,
    },
  });
}
