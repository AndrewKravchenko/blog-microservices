import { useEffect, useState } from 'react';

import type { Comment } from '@/entities/comment/comment-list/model/types.ts';

import { getComments } from '../model/get-comments.ts';

export const CommentList = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getComments(postId).then(setComments);
  }, [postId]);

  return (
    <ul>
      {comments.map((comment) => {
        return <li key={comment.id}>{comment.content}</li>;
      })}
    </ul>
  );
};
