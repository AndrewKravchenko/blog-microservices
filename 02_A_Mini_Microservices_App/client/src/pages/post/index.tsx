import { CreatePostForm } from '@/features/post/create-post-form';
import { PostList } from '@/widgets/post/post-list';

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
