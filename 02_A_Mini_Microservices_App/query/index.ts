import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import path from "node:path";

const envPath = `.env.${process.env.NODE_ENV || 'development'}`;

dotenv.config({
  path: path.resolve(process.cwd(), envPath)
});

type EventType = 'PostCreated' | 'CommentCreated' | 'CommentUpdated';
type CommentStatus = 'pending' | 'approved' | 'rejected';
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

const handleEvent = (type: EventType, data: any) => {
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

    if (comment) {
      comment.status = status;
      comment.content = content;
    }
  }
};

app.get(POSTS_ROUTE, (req: Request, res: Response) => {
  res.send(posts)
});

app.get(EVENTS_ROUTE, (req: Request, res: Response) => {
  const { type, data } = req.body;

  handleEvent(type, data);
  res.send({});
});

const PORT = process.env.PORT || 4002;
app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);

  const res = await axios.get(`${process.env.EVENT_BUS_SERVICE_URL}${EVENTS_ROUTE}`);

  for (let event of res.data) {
    console.log('Processing event:', event.type);
    handleEvent(event.type, event.data);
  }
});