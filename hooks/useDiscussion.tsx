"use client";

import { useState } from "react";
import {
  discussionService,
  CreateDiscussionPayload,
  CreateReplyPayload,
} from "@/services/discussionService";
import { useToastStore } from "@/store/useToastStore";

function getErrorMessage(err: any): string {
  return (
    err?.response?.data?.error ||
    err?.response?.data?.message ||
    err?.message ||
    "Something went wrong"
  );
}

export function useDiscussion() {
  const { addToast } = useToastStore();

  const [fetchingDiscussions, setFetchingDiscussions] = useState(false);
  const [creatingDiscussion, setCreatingDiscussion] = useState(false);
  const [deletingDiscussion, setDeletingDiscussion] = useState(false);
  const [fetchingReplies, setFetchingReplies] = useState(false);
  const [creatingReply, setCreatingReply] = useState(false);
  const [deletingReply, setDeletingReply] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function getLessonDiscussions(lessonId: string) {
    setFetchingDiscussions(true);
    setError(null);
    try {
      const res = await discussionService.getLessonDiscussions(lessonId);
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setFetchingDiscussions(false);
    }
  }

  async function createDiscussion(
    lessonId: string,
    data: CreateDiscussionPayload,
  ) {
    setCreatingDiscussion(true);
    setError(null);
    try {
      const res = await discussionService.createDiscussion(lessonId, data);
      addToast("Comment posted successfully", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setCreatingDiscussion(false);
    }
  }

  async function deleteDiscussion(discussionId: string) {
    setDeletingDiscussion(true);
    setError(null);
    try {
      const res = await discussionService.deleteDiscussion(discussionId);
      addToast("Comment deleted", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setDeletingDiscussion(false);
    }
  }

  async function getDiscussionReplies(discussionId: string) {
    setFetchingReplies(true);
    setError(null);
    try {
      const res = await discussionService.getDiscussionReplies(discussionId);
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setFetchingReplies(false);
    }
  }

  async function createReply(discussionId: string, data: CreateReplyPayload) {
    setCreatingReply(true);
    setError(null);
    try {
      const res = await discussionService.createReply(discussionId, data);
      addToast("Reply posted successfully", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setCreatingReply(false);
    }
  }

  async function deleteReply(replyId: string) {
    setDeletingReply(true);
    setError(null);
    try {
      const res = await discussionService.deleteReply(replyId);
      addToast("Reply deleted", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setDeletingReply(false);
    }
  }

  return {
    fetchingDiscussions,
    creatingDiscussion,
    deletingDiscussion,
    fetchingReplies,
    creatingReply,
    deletingReply,

    error,

    getLessonDiscussions,
    createDiscussion,
    deleteDiscussion,
    getDiscussionReplies,
    createReply,
    deleteReply,
  };
}
