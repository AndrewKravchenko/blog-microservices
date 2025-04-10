import { toast } from 'react-toastify';

import { postsApi } from '@/shared/api/posts-api.ts';

export const createPost = async (title: string) => {
  try {
    const response = await postsApi.post('posts', {
      json: { title },
    });
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`Error creating post: ${error.message}`);
    } else {
      toast.error('Unknown error occurred while creating post');
    }
  }
};
