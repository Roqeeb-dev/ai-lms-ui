export type DiscussionUser = {
  _id: string;
  name: string;
};

export type ServerDiscussion = {
  _id: string;
  lesson: string;
  user: DiscussionUser;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Discussion = {
  id: string;
  lessonId: string;
  user: DiscussionUser;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ServerReply = {
  _id: string;
  discussion: string;
  user: DiscussionUser;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Reply = {
  id: string;
  discussionId: string;
  user: DiscussionUser;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export function normalizeDiscussion(data: ServerDiscussion): Discussion {
  return {
    id: data._id,
    lessonId: data.lesson,
    user: data.user,
    content: data.content,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}

export function normalizeAllDiscussions(
  data: ServerDiscussion[],
): Discussion[] {
  return data.map(normalizeDiscussion);
}

export function normalizeReply(data: ServerReply): Reply {
  return {
    id: data._id,
    discussionId: data.discussion,
    user: data.user,
    content: data.content,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}

export function normalizeAllReplies(data: ServerReply[]): Reply[] {
  return data.map(normalizeReply);
}
