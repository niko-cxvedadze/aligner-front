export type TWorkspace = {
  _id: string;
  name: string;
  ownerId: string;
  color?: string;
  default: boolean;
};

export type TTask = {
  _id: string;
  name: string;
  description: string;
  priority: string;
  status: string;
  workspaceId: string;
};
