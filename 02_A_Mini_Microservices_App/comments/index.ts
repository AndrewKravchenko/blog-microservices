import express, { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

type Comment = {
  id: string;
  content: string;
}

const COMMENTS_ROUTE = '/posts/:id/comments';
const EVENTS_ROUTE = '/events';
const commentsByPostId: Record<string, Comment[]> = {};

const generateCommentId = (): string => randomBytes(4).toString('hex');

app.get(COMMENTS_ROUTE, (req: Request, res: Response) => {
  const comments = commentsByPostId[req.params.id] || [];
  res.send(comments);
});

app.post(COMMENTS_ROUTE, async (req: Request, res: Response) => {
  const { content } = req.body;
  const postId = req.params.id;
  const commentId = generateCommentId();

  if (!postId) {
    res.status(400).send({ error: 'Post ID is required' });
  }
  if (!content) {
    res.status(400).send({ error: 'Content is required' });
  }

  const comments = commentsByPostId[postId] || [];

  const newComment: Comment = {
    id: commentId,
    content,
  };

  comments.push(newComment);
  commentsByPostId[postId] = comments;

  await axios.post(`${process.env.EVENTS_SERVICE_URL}/events`, {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId,
    },
  });

  res.status(201).send(comments);
});

app.post(EVENTS_ROUTE, (req, res) => {
  console.log('Event Received', req.body.type);

  res.send({});
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
