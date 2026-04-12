"use client";

import { useState, useEffect } from "react";
import { useDiscussion } from "@/hooks/useDiscussion";
import { useUserStore } from "@/store/useUserStore";
import { Discussion, Reply } from "@/types/discussion";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { DiscussionItem } from "./DiscussionItem";
import { DiscussionSkeleton } from "./DiscussionSkeleton";

export default function DiscussionSection({ lessonId }: { lessonId: string }) {
  const user = useUserStore((state) => state.user);
  const {
    fetchingDiscussions,
    creatingDiscussion,
    deletingDiscussion,
    creatingReply,
    deletingReply,
    getLessonDiscussions,
    createDiscussion,
    deleteDiscussion,
    getDiscussionReplies,
    createReply,
    deleteReply,
  } = useDiscussion();

  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await getLessonDiscussions(lessonId);
        if (res?.discussions) setDiscussions(res.discussions);
      } catch {}
    }
    load();
  }, [lessonId]);

  async function handleCreateDiscussion(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await createDiscussion(lessonId, { content: newComment.trim() });
      setNewComment("");
      const res = await getLessonDiscussions(lessonId);
      if (res?.discussions) setDiscussions(res.discussions);
    } catch {}
  }

  async function handleDeleteDiscussion(discussionId: string) {
    try {
      await deleteDiscussion(discussionId);
      setDiscussions((prev) => prev.filter((d) => d.id !== discussionId));
    } catch {}
  }

  async function handleCreateReply(discussionId: string, content: string) {
    await createReply(discussionId, { content });
  }

  async function handleFetchReplies(discussionId: string): Promise<Reply[]> {
    try {
      const res = await getDiscussionReplies(discussionId);
      return res?.replies ?? [];
    } catch {
      return [];
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Comment input */}
      <form onSubmit={handleCreateDiscussion} className="flex flex-col gap-3">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts or ask a question about this lesson..."
          rows={3}
          className="w-full text-sm px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 resize-none"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!newComment.trim() || creatingDiscussion}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {creatingDiscussion ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Send size={13} />
                Post Comment
              </>
            )}
          </button>
        </div>
      </form>

      <div className="h-px bg-border" />

      {!fetchingDiscussions && discussions.length > 0 && (
        <div className="flex items-center gap-2">
          <MessageSquare size={13} className="text-foreground-muted" />
          <span className="text-xs font-semibold text-foreground-muted uppercase tracking-widest">
            {discussions.length} comment{discussions.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* List */}
      {fetchingDiscussions ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <DiscussionSkeleton key={i} />
          ))}
        </div>
      ) : discussions.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
            <MessageSquare size={18} className="text-foreground-muted" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-foreground">
              No comments yet
            </p>
            <p className="text-xs text-foreground-muted leading-relaxed max-w-xs">
              Be the first to start a discussion about this lesson.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {discussions.map((discussion) => (
            <DiscussionItem
              key={discussion.id}
              discussion={discussion}
              currentUserId={user?.id ?? ""}
              onDelete={handleDeleteDiscussion}
              onCreateReply={handleCreateReply}
              onDeleteReply={deleteReply}
              onFetchReplies={handleFetchReplies}
              deletingDiscussion={deletingDiscussion}
              creatingReply={creatingReply}
              deletingReply={deletingReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}
