export type AiRole = "user" | "assistant";

export type AiMessage = {
  role: AiRole;
  content: string;
};

export type AiStreamOptions = {
  system: string;
  messages: AiMessage[];
  maxTokens?: number;
  temperature?: number;
  signal?: AbortSignal;
};

/**
 * Provider abstraction so the AI backend can be swapped (Anthropic ↔ OpenAI, or
 * a future provider) without touching the frontend or the chat route. Each
 * provider yields plain text deltas, which the route pipes to the client.
 */
export interface AiProvider {
  readonly name: string;
  streamChat(options: AiStreamOptions): AsyncGenerator<string, void, unknown>;
}
