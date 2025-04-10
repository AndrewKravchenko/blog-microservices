import { postsApi } from '@/shared/api/posts-api.ts';

import type { Post } from './types';

export const getPosts = async (): Promise<Post[]> => {
  const response = await postsApi.get('posts');
  return response.json();
};
