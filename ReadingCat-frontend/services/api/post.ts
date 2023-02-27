import { AxiosInstance } from 'axios';
import { ResponsePostType, CreatePostType, SearchPostType } from './types';

export const PostApi = (instance: AxiosInstance) => ({
  async getAllPosts() {
    const { data } = await instance.get<ResponsePostType[]>('/posts');
    return data;
  },
  async getPostById(id: number) {
    const { data } = await instance.get<ResponsePostType>(`/posts/${id}`);
    return data;
  },
  async searchPost(searchPostType: SearchPostType) {
    const { data } = await instance.get<{ items: ResponsePostType[]; total: number }>(
      `/posts/search/`,
      {
        params: searchPostType,
      },
    );
    return data;
  },

  async createPost(createPostType: CreatePostType) {
    const { data } = await instance.post('/posts', createPostType);
    return data as ResponsePostType;
  },
  async updatePost(id: number, createPostType: CreatePostType) {
    const { data } = await instance.patch(`/posts/${id}`, createPostType);
    return data as ResponsePostType;
  },
});
