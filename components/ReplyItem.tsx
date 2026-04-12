"use client";

import type { Reply } from "@/types/discussion";
import { Trash2 } from "lucide-react";
import { Avatar } from "./Avatar";
import { formatTime } from "@/lib/formatTime";

export function ReplyItem({
  reply,
  currentUserId,
  onDelete,
  deleting,
}: {
  reply: Reply;
  currentUserId: string;
  onDelete: (replyId: string) => void;
  deleting: boolean;
}) {
  const isOwner = reply.user._id === currentUserId;

  return (
    <div className="flex items-start gap-3 pl-4 border-l-2 border-border">
      <Avatar name={reply.user.name} />
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-foreground">
              {reply.user.name}
            </span>
            <span className="text-[10px] text-foreground-muted">
              {formatTime(reply.createdAt)}
            </span>
          </div>
          {isOwner && (
            <button
              onClick={() => onDelete(reply.id)}
              disabled={deleting}
              className="p-1 rounded-md text-foreground-muted hover:text-destructive hover:bg-destructive/10 transition-all duration-150 disabled:opacity-40"
            >
              <Trash2 size={11} />
            </button>
          )}
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {reply.content}
        </p>
      </div>
    </div>
  );
}
