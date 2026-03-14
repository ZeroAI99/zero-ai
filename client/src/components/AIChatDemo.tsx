/*
 * ZERO AI — AIChatDemo
 * Interactive AI chat demo embedded in the landing page
 * Uses the Zero AI persona via the /ai/chat endpoint
 */

import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTER_PROMPTS = [
  "What is Constitutional Memory?",
  "How is Zero AI different from ChatGPT?",
  "What does Level 5 Symbiotic AI mean?",
  "How does the Governance Engine work?",
];

export default function AIChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "> System initialized.\n\nI am Zero AI — your personal AI operating system. Ask me anything about the future of human-AI partnership.",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.ai.chat.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "> Error: System temporarily unavailable. Try again." },
      ]);
    },
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim() || chatMutation.isPending) return;
    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    chatMutation.mutate({ messages: newMessages });
  };

  const mono = { fontFamily: "'IBM Plex Mono', monospace" };
  const dm = { fontFamily: "'DM Sans', sans-serif" };

  return (
    <div
      className="border border-white/[0.08] rounded-sm overflow-hidden"
      style={{ background: "oklch(0.065 0.008 265)" }}
    >
      {/* Terminal header */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]"
        style={{ background: "oklch(0.075 0.008 265)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[oklch(0.6_0.18_25/0.6)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[oklch(0.75_0.15_85/0.6)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[oklch(0.76_0.18_155/0.6)]" />
        </div>
        <span className="text-xs text-[oklch(0.35_0.006_265)] ml-2" style={mono}>
          zero-ai — live demo
        </span>
        <span className="ml-auto text-xs text-[oklch(0.76_0.18_155)]" style={mono}>
          ● online
        </span>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div
              className="w-6 h-6 rounded-sm flex-shrink-0 flex items-center justify-center text-xs"
              style={{
                background: msg.role === "assistant"
                  ? "oklch(0.76 0.18 155 / 0.15)"
                  : "oklch(1 0 0 / 0.06)",
                border: msg.role === "assistant"
                  ? "1px solid oklch(0.76 0.18 155 / 0.3)"
                  : "1px solid oklch(1 0 0 / 0.1)",
                color: msg.role === "assistant" ? "oklch(0.76 0.18 155)" : "oklch(0.65 0.01 265)",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              {msg.role === "assistant" ? "Z" : "U"}
            </div>
            <div
              className={`flex-1 text-xs leading-relaxed whitespace-pre-wrap ${
                msg.role === "user" ? "text-right" : ""
              }`}
              style={{
                ...dm,
                color: msg.role === "assistant"
                  ? "oklch(0.75 0.008 265)"
                  : "oklch(0.65 0.01 265)",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {chatMutation.isPending && (
          <div className="flex gap-3">
            <div
              className="w-6 h-6 rounded-sm flex-shrink-0 flex items-center justify-center text-xs"
              style={{
                background: "oklch(0.76 0.18 155 / 0.15)",
                border: "1px solid oklch(0.76 0.18 155 / 0.3)",
                color: "oklch(0.76 0.18 155)",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              Z
            </div>
            <div className="flex items-center gap-1 pt-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{
                    background: "oklch(0.76 0.18 155 / 0.6)",
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Starter prompts */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {STARTER_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              disabled={chatMutation.isPending}
              className="text-xs px-3 py-1.5 border border-white/[0.08] rounded-sm text-[oklch(0.45_0.008_265)] hover:text-[oklch(0.76_0.18_155)] hover:border-[oklch(0.76_0.18_155/0.3)] transition-all duration-150 disabled:opacity-40"
              style={mono}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="border-t border-white/[0.06] flex items-center gap-2 px-4 py-3">
        <span className="text-[oklch(0.76_0.18_155)] text-xs flex-shrink-0" style={mono}>
          &gt;
        </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") sendMessage(input); }}
          placeholder="Ask Zero AI anything..."
          disabled={chatMutation.isPending}
          className="flex-1 bg-transparent text-xs text-[oklch(0.75_0.008_265)] placeholder-[oklch(0.3_0.006_265)] focus:outline-none disabled:opacity-50"
          style={mono}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={chatMutation.isPending || !input.trim()}
          className="text-xs text-[oklch(0.76_0.18_155)] hover:text-[oklch(0.85_0.18_155)] disabled:opacity-30 transition-colors flex-shrink-0"
          style={mono}
        >
          ↵
        </button>
      </div>
    </div>
  );
}
