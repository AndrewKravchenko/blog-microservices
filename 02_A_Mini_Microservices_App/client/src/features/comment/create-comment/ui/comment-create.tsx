import { type FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { createComment } from '@/features/comment/create-comment/model/create-comment.ts';

export const CreateCommentForm = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!comment.trim()) {
      toast.error('Comment cannot be empty!');
      return;
    }

    setIsSubmitting(true);
    await createComment(postId, comment);

    setComment('');
    setIsSubmitting(false);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="comment">New Comment</label>
          <input
            id="comment"
            type="text"
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter comment"
            disabled={isSubmitting}
            aria-label="Enter comment"
            aria-describedby="Enter comment"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};
