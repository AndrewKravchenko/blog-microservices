import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import path from "node:path";

const envPath = `.env.${process.env.NODE_ENV || 'development'}`;

dotenv.config({
  path: path.resolve(process.cwd(), envPath)
});

const EVENTS_ROUTE = '/events';

const app = express();
app.use(express.json());

app.post(EVENTS_ROUTE, async (req: Request, res: Response) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post(`${process.env.EVENT_BUS_SERVICE_URL}${EVENTS_ROUTE}`, {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }

  res.send({});
});

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
