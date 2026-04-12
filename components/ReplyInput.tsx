"use client";

import { useState, useRef } from "react";
import { Loader2, Send } from "lucide-react";

export function ReplyInput({
  onSubmit,
  creating,
}: {
  onSubmit: (content: string) => Promise<void>;
  creating: boolean;
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    await onSubmit(value.trim());
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 pl-4">
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write a reply..."
        className="flex-1 text-xs px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
      />
      <button
        type="submit"
        disabled={!value.trim() || creating}
        className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {creating ? (
          <Loader2 size={12} className="animate-spin" />
        ) : (
          <Send size={12} />
        )}
      </button>
    </form>
  );
}
