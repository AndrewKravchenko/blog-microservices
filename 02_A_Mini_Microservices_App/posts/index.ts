import express, { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

type Post = {
  id: string;
  title: string;
}

const POSTS_ROUTE = '/posts';
const EVENTS_ROUTE = '/events';
const posts: Record<string, Post> = {};

const app = express();
app.use(express.json());
app.use(cors());

const generatePostId = (): string => randomBytes(4).toString('hex');

app.get(POSTS_ROUTE, (req: Request, res: Response) => {
  res.send(Object.values(posts));
});

app.post(POSTS_ROUTE, async (req: Request, res: Response) => {
  const id = generatePostId();
  const { title } = req.body;

  if (!title) {
    res.status(400).send({ error: 'Title is required' });
  }

  const newPost: Post = { id, title };
  posts[id] = newPost;

  res.status(201).send(newPost);
});

app.post(EVENTS_ROUTE, (req, res) => {
  console.log('Event Received', req.body.type);

  res.send({});
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
