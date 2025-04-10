import { api } from '@/shared/api/ky';

import type { Post } from './types';

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get('posts');
  return response.json();
};
