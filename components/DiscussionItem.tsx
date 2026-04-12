"use client";

import type { Discussion, Reply } from "@/types/discussion";
import { useState } from "react";
import {
  Trash2,
  CornerDownRight,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { formatTime } from "@/lib/formatTime";
import { Avatar } from "./Avatar";
import { ReplyItem } from "./ReplyItem";
import { ReplyInput } from "./ReplyInput";

interface DiscussionItemProps {
  discussion: Discussion;
  currentUserId: string;
  onDelete: (id: string) => void;
  onCreateReply: (discussionId: string, content: string) => Promise<void>;
  onDeleteReply: (replyId: string) => Promise<any>;
  onFetchReplies: (discussionId: string) => Promise<Reply[]>;
  deletingDiscussion: boolean;
  creatingReply: boolean;
  deletingReply: boolean;
}

export function DiscussionItem({
  discussion,
  currentUserId,
  onDelete,
  onCreateReply,
  onDeleteReply,
  onFetchReplies,
  deletingDiscussion,
  creatingReply,
  deletingReply,
}: DiscussionItemProps) {
  const isOwner = discussion.user._id === currentUserId;
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loadingReplies, setLoadingReplies] = useState(false);

  async function handleToggleReplies() {
    if (!showReplies && replies.length === 0) {
      setLoadingReplies(true);
      const fetched = await onFetchReplies(discussion.id);
      setReplies(fetched);
      setLoadingReplies(false);
    }
    setShowReplies((prev) => !prev);
  }

  async function handleCreateReply(content: string) {
    await onCreateReply(discussion.id, content);
    const fetched = await onFetchReplies(discussion.id);
    setReplies(fetched);
    setShowReplies(true);
    setShowReplyInput(false);
  }

  async function handleDeleteReply(replyId: string) {
    try {
      await onDeleteReply(replyId);
      setReplies((prev) => prev.filter((r) => r.id !== replyId));
    } catch {}
  }

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-background hover:border-border-subtle transition-all duration-150">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Avatar name={discussion.user.name} />
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-foreground">
                {discussion.user.name}
              </span>
              <span className="text-[10px] text-foreground-muted">
                {formatTime(discussion.createdAt)}
              </span>
            </div>
            {isOwner && (
              <button
                onClick={() => onDelete(discussion.id)}
                disabled={deletingDiscussion}
                className="p-1.5 rounded-md text-foreground-muted hover:text-destructive hover:bg-destructive/10 transition-all duration-150 disabled:opacity-40"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            {discussion.content}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pl-11">
        <button
          onClick={() => setShowReplyInput((prev) => !prev)}
          className="flex items-center gap-1.5 text-xs font-medium text-foreground-muted hover:text-primary transition-colors duration-150"
        >
          <CornerDownRight size={12} />
          Reply
        </button>

        <button
          onClick={handleToggleReplies}
          className="flex items-center gap-1.5 text-xs font-medium text-foreground-muted hover:text-primary transition-colors duration-150"
        >
          {showReplies ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          {loadingReplies
            ? "Loading..."
            : replies.length > 0
              ? `${replies.length} repl${replies.length === 1 ? "y" : "ies"}`
              : "Replies"}
        </button>
      </div>

      {/* Reply input */}
      {showReplyInput && (
        <ReplyInput onSubmit={handleCreateReply} creating={creatingReply} />
      )}

      {/* Replies list */}
      {showReplies && (
        <div className="flex flex-col gap-3 pl-4">
          {loadingReplies ? (
            <div className="flex items-center gap-2 text-xs text-foreground-muted pl-4">
              <Loader2 size={12} className="animate-spin" />
              Loading replies...
            </div>
          ) : replies.length === 0 ? (
            <p className="text-xs text-foreground-muted italic pl-4">
              No replies yet. Be the first to reply.
            </p>
          ) : (
            replies.map((reply) => (
              <ReplyItem
                key={reply.id}
                reply={reply}
                currentUserId={currentUserId}
                onDelete={handleDeleteReply}
                deleting={deletingReply}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
