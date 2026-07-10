import "server-only";
import type { AiProvider } from "./types";
import { createAnthropicProvider } from "./anthropic";
import { createOpenAiProvider } from "./openai";

function looksReal(v: string | undefined): v is string {
  return !!v && v.length > 12 && !v.startsWith("your-");
}

const provider = (process.env.AI_PROVIDER ?? "anthropic").toLowerCase();
const anthropicKey = process.env.ANTHROPIC_API_KEY;
const openaiKey = process.env.OPENAI_API_KEY;
const model = process.env.AI_MODEL;

const defaultModel =
  provider === "openai" ? "gpt-4o-mini" : "claude-haiku-4-5-20251001";

/**
 * Returns a configured AI provider, or null when no key is present so the
 * chat route can fall back to a scripted, still-useful experience.
 */
export function getAiProvider(): AiProvider | null {
  if (provider === "openai" && looksReal(openaiKey)) {
    return createOpenAiProvider(openaiKey, model || defaultModel);
  }
  if (provider === "anthropic" && looksReal(anthropicKey)) {
    return createAnthropicProvider(anthropicKey, model || defaultModel);
  }
  // Fall back to whichever key is actually present, regardless of preference.
  if (looksReal(anthropicKey)) {
    return createAnthropicProvider(anthropicKey, model || "claude-haiku-4-5-20251001");
  }
  if (looksReal(openaiKey)) {
    return createOpenAiProvider(openaiKey, model || "gpt-4o-mini");
  }
  return null;
}

export const isAiConfigured = looksReal(anthropicKey) || looksReal(openaiKey);
