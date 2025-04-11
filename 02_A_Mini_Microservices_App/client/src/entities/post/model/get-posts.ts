import { queryApi } from '@/shared/api/query-api.ts';

import type { Post } from './types';

export const getPosts = async (): Promise<Post[]> => {
  const response = await queryApi.get('posts');
  return response.json();
};
