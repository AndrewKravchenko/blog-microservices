import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

type CommentStatus = "approved" | "rejected" | "pending";
type Comment = {
  id: string;
  content: string
  status: CommentStatus;
};
type Post = {
  id: string;
  title: string;
  comments: Comment[];
}

const POSTS_ROUTE = '/posts';
const EVENTS_ROUTE = '/events';
const posts: Record<string, Post> = {};

const app = express();

app.use(express.json());
app.use(cors());

app.get(POSTS_ROUTE, (req: Request, res: Response) => {
  res.send(posts)
});

app.get(EVENTS_ROUTE, (req: Request, res: Response) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }
  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    if (!comment) {
      res.status(404).send({ error: 'Comment not found' });
      return
    }
    comment.status = status;
    comment.content = content;
  }

  console.log(posts);

  res.send({});
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});