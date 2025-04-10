import { PostList } from '@/entities/post/post-list';
import { CreatePostForm } from '@/features/post/create-post-form';

export const PostPage = () => {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <CreatePostForm />
      <hr />
      <h1>Posts</h1>
      <PostList />
    </div>
  );
};
