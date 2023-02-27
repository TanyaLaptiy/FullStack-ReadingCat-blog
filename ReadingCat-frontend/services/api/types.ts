import { OutputData } from '@editorjs/editorjs';

export type LoginUserType = {
  email: string;
  password: string;
};
export type CreateUserType = {
  fullName: string;
} & LoginUserType;

export type ResponseAuthType = {
  id: number;
  fullName: string;
  email: string;
  password: string;
  access_token: string;
  createdAt: string;
  updateAt: string;
  avatarUrl?: string;
};

export type ResponseUserType = {
  id: number;
  commentCount: number;
  fullName: string;
  email: string;
  password: string;
  access_token: string;
  createdAt: string;
  updateAt: string;
  avatarUrl?: string;
};

export type SearchPostType = {
  title?: string;
  text?: string;
  limit?: number;
  take?: number;
  views?: 'DESC' | 'ASC';
  tag?: string;
};

export type CreatePostType = {
  title: string;
  text: OutputData['blocks'];
};

export type CreateCommentType = {
  text: string;
  postId: number;
};

export type ResponsePostType = {
  id: number;
  title: string;
  secondTitle: string;
  ownerId: ResponseAuthType;
  text: OutputData['blocks'];
  tags: null | string;
  views: number;
  createdAt: string;
  updateAt: string;
};
export type ResponseCommentType = {
  id: number;
  text: string;
  postId: number;
  ownerId: ResponseAuthType;
  createdAt: string;
  updateAt: string;
};
