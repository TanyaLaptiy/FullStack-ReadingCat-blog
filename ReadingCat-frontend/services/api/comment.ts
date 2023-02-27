import { AxiosInstance } from 'axios';
import { ResponseCommentType, CreateCommentType } from './types';

export const CommentApi = (instance: AxiosInstance) => ({
  async getAllCommentsByPostId(id: number) {
    const { data } = await instance.get<ResponseCommentType[]>(`/comments/${id}`);
    return data;
  },

  async getAllComments() {
    const { data } = await instance.get<ResponseCommentType[]>(`/comments`);
    return data;
  },

  async createComment(createCommentType: CreateCommentType) {
    const { data } = await instance.post('/comments', createCommentType);
    return data as ResponseCommentType;
  },
  async deleteComment(id: number) {
    const { data } = await instance.delete(`/comments/${id}`);
    return data as ResponseCommentType;
  },
});
