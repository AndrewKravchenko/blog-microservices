import { toast } from 'react-toastify';

import { commentApi } from '@/shared/api/comment-api.ts';

export const createComment = async (postId: string, content: string): Promise<void> => {
  try {
    await commentApi.post(`posts/${postId}/comments`, {
      json: { content },
    });
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`Error creating post: ${error.message}`);
    } else {
      toast.error('Unknown error occurred while creating post');
    }
  }
};
