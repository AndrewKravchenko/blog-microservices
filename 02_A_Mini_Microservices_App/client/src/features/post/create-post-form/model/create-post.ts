import { toast } from 'react-toastify';

import { api } from '@/shared/api/ky';

export const createPost = async (title: string) => {
  try {
    const response = await api.post('posts', {
      json: { title },
    });
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`Error creating post: ${error.message}`);
    }
    toast.error('Unknown error occurred while creating post');
  }
};
