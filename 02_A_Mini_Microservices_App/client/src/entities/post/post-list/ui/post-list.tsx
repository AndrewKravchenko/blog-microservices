import { useState, useEffect } from 'react';

import { getPosts } from '../model/get-posts.ts';

import type { Post } from '../model/types.ts';

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
            </div>
          </div>
        );
      })}
    </div>
  );
};
