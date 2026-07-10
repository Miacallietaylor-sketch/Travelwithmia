import "server-only";
import type { AiProvider, AiStreamOptions } from "./types";

const API_URL = "https://api.anthropic.com/v1/messages";
const VERSION = "2023-06-01";

/** Anthropic (Claude) provider — streams via the Messages API SSE. */
export function createAnthropicProvider(
  apiKey: string,
  model: string
): AiProvider {
  return {
    name: "anthropic",
    async *streamChat({
      system,
      messages,
      maxTokens = 700,
      temperature = 0.6,
      signal,
    }: AiStreamOptions) {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": VERSION,
        },
        body: JSON.stringify({
          model,
          max_tokens: maxTokens,
          temperature,
          system,
          stream: true,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal,
      });

      if (!res.ok || !res.body) {
        const detail = await res.text().catch(() => "");
        throw new Error(`Anthropic error ${res.status}: ${detail.slice(0, 200)}`);
      }

      yield* parseSse(res.body, (json) => {
        if (json.type === "content_block_delta" && json.delta?.type === "text_delta") {
          return json.delta.text as string;
        }
        return "";
      });
    },
  };
}

/** Shared minimal SSE line parser. Extracts text via `pick`. */
export async function* parseSse(
  body: ReadableStream<Uint8Array>,
  pick: (json: any) => string
): AsyncGenerator<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      try {
        const text = pick(JSON.parse(data));
        if (text) yield text;
      } catch {
        // ignore keep-alive / non-JSON lines
      }
    }
  }
}
