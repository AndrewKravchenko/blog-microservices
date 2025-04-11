import type { Comment } from '@/shared/types/comment.ts';

export type Post = {
  id: string;
  title: string;
  comments: Comment[];
};
