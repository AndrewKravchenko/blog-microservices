import { toast } from 'react-toastify';

import { postApi } from '@/shared/api/post-api.ts';

export const createPost = async (title: string) => {
  try {
    const response = await postApi.post('posts', {
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
