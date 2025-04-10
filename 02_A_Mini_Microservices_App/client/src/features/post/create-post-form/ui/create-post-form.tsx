import { useState } from 'react';
import { toast } from 'react-toastify';

import { createPost } from '../model/create-post.ts';

import type { FormEvent } from 'react';

export const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Post title cannot be empty!');
      return;
    }

    setIsSubmitting(true);

    try {
      await createPost(title);
      setTitle('');
      toast.success('Post created successfully!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Post Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            placeholder="Enter post title"
            disabled={isSubmitting}
            aria-label="Enter post title"
            aria-describedby="Enter post title"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          Create
        </button>
      </form>
    </div>
  );
};
