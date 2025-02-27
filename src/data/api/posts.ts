import axios from 'axios';
import { Post, PaginationParams } from '../../domain/entities/Post';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const postsApi = {
  getPosts: async ({ page, limit }: PaginationParams): Promise<Post[]> => {
    const start = (page - 1) * limit;
    const response = await api.get(`/posts?_start=${start}&_limit=${limit}`);
    return response.data;
  },

  getPost: async (id: number): Promise<Post> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  createPost: async (post: Omit<Post, 'id'>): Promise<Post> => {
    const response = await api.post('/posts', post);
    return response.data;
  },

  updatePost: async (post: Post): Promise<Post> => {
    const response = await api.put(`/posts/${post.id}`, post);
    return response.data;
  },

  deletePost: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },
};