import { commentsApi } from '@/shared/api/comments-api.ts';

import type { Comment } from './types.ts';

export const getComments = async (postId: string): Promise<Comment[]> => {
  const response = await commentsApi.get(`posts/${postId}/comments`);
  return response.json();
};
