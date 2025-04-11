import type { Comment } from '@/entities/comment/comment-list/model/types.ts';

export const CommentList = ({ comments }: { comments: Comment[] }) => {
  return (
    <ul>
      {comments.map((comment) => {
        return <li key={comment.id}>{comment.content}</li>;
      })}
    </ul>
  );
};
