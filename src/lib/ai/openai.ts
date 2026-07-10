import "server-only";
import type { AiProvider, AiStreamOptions } from "./types";
import { parseSse } from "./anthropic";

const API_URL = "https://api.openai.com/v1/chat/completions";

/** OpenAI provider — streams via the Chat Completions API SSE. */
export function createOpenAiProvider(
  apiKey: string,
  model: string
): AiProvider {
  return {
    name: "openai",
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
          authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          max_tokens: maxTokens,
          temperature,
          stream: true,
          messages: [
            { role: "system", content: system },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
          ],
        }),
        signal,
      });

      if (!res.ok || !res.body) {
        const detail = await res.text().catch(() => "");
        throw new Error(`OpenAI error ${res.status}: ${detail.slice(0, 200)}`);
      }

      yield* parseSse(res.body, (json) => json.choices?.[0]?.delta?.content ?? "");
    },
  };
}
