import { useEffect, useState } from 'react';

import { CommentList } from '@/entities/comment';
import { getPosts, type Post } from '@/entities/post/model';
import { CreateCommentForm } from '@/features/comment/create-comment';

export const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div className="d-flex flex-row flex-wrap justify justify-content-between">
      {posts.map((post) => {
        return (
          <div className="card" style={{ width: '30%', marginBottom: '20px' }} key={post.id}>
            <div className="card-body">
              <h3>{post.title}</h3>
              <CommentList comments={post.comments} />
              <CreateCommentForm postId={post.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
