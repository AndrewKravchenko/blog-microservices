import { notReachable } from '@/shared/lib/assertions';
import type { Comment } from '@/shared/types/comment';

export const CommentList = ({ comments }: { comments: Comment[] }) => {
  const getCommentContent = (comment: Comment): string => {
    switch (comment.status) {
      case 'approved':
        return comment.content;
      case 'pending':
        return 'This comment is awaiting moderation';
      case 'rejected':
        return 'This comment has been rejected';
      default:
        return notReachable(comment.status);
    }
  };

  return (
    <ul>
      {comments.map((comment) => {
        return <li key={comment.id}>{getCommentContent(comment)}</li>;
      })}
    </ul>
  );
};
