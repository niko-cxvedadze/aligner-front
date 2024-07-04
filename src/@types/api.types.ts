export type TWorkspace = {
  _id: string;
  name: string;
  ownerId: string;
  color?: string;
  default: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TTask = {
  _id: string;
  name: string;
  description: string;
  priority: string;
  status: string;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
};

export type TBookmarkTopic = {
  _id: string;
  title: string;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
};

export type TBookmark = {
  _id: string;
  title: string;
  url: string;
  topic?: TBookmarkTopic;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
};
