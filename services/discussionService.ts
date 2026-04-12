import { apiClient } from "@/lib/apiClient";
import {
  ServerDiscussion,
  ServerReply,
  normalizeDiscussion,
  normalizeAllDiscussions,
  normalizeReply,
  normalizeAllReplies,
} from "@/types/discussion";

export interface CreateDiscussionPayload {
  content: string;
}

export interface CreateDiscussionResponse {
  success: boolean;
  data: {
    lesson: string;
    user: string;
    content: string;
    _id: string;
  };
}

export interface GetLessonDiscussionsResponse {
  success: boolean;
  data: ServerDiscussion[];
}

export interface DeleteDiscussionResponse {
  success: boolean;
  error?: string;
}

export interface CreateReplyPayload {
  content: string;
}

export interface CreateReplyResponse {
  success: boolean;
  data: {
    discussion: string;
    user: string;
    content: string;
    _id: string;
  };
}

export interface GetDiscussionRepliesResponse {
  success: boolean;
  data: ServerReply[];
}

export interface DeleteReplyResponse {
  success: boolean;
  error?: string;
}

export const discussionService = {
  async getLessonDiscussions(lessonId: string) {
    const res = await apiClient.get<GetLessonDiscussionsResponse>(
      `/api/lessons/${lessonId}/discussions`,
    );
    return {
      success: res.success,
      discussions: normalizeAllDiscussions(res.data),
    };
  },

  async createDiscussion(lessonId: string, data: CreateDiscussionPayload) {
    const res = await apiClient.post<
      CreateDiscussionResponse,
      CreateDiscussionPayload
    >(`/api/lessons/${lessonId}/discussions`, data);
    return {
      success: res.success,
      discussion: res.data,
    };
  },

  async deleteDiscussion(discussionId: string) {
    const res = await apiClient.delete<DeleteDiscussionResponse>(
      `/api/discussions/${discussionId}`,
    );
    return {
      success: res.success,
    };
  },

  async getDiscussionReplies(discussionId: string) {
    const res = await apiClient.get<GetDiscussionRepliesResponse>(
      `/api/discussions/${discussionId}/replies`,
    );
    return {
      success: res.success,
      replies: normalizeAllReplies(res.data),
    };
  },

  async createReply(discussionId: string, data: CreateReplyPayload) {
    const res = await apiClient.post<CreateReplyResponse, CreateReplyPayload>(
      `/api/discussions/${discussionId}/replies`,
      data,
    );
    return {
      success: res.success,
      reply: res.data,
    };
  },

  async deleteReply(replyId: string) {
    const res = await apiClient.delete<DeleteReplyResponse>(
      `/api/discussions/replies/${replyId}`,
    );
    return {
      success: res.success,
    };
  },
};
