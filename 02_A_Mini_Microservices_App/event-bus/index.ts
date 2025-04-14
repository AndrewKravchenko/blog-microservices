import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const EVENTS_ROUTE = '/events';
const events: any[] = [];

const app = express();

app.use(express.json());

app.get(EVENTS_ROUTE, (req: Request, res: Response) => {
  res.send(events);
});

app.post(EVENTS_ROUTE, (req: Request, res: Response)  => {
  const event = req.body;
  events.push(event);

  axios.post(`${process.env.POSTS_SERVICE_URL}${EVENTS_ROUTE}`, event);
  axios.post(`${process.env.COMMENTS_SERVICE_URL}${EVENTS_ROUTE}`, event);
  axios.post(`${process.env.QUERY_SERVICE_URL}${EVENTS_ROUTE}`, event);
  axios.post(`${process.env.MODERATION_SERVICE_URL}${EVENTS_ROUTE}`, event);

  res.send({ status: 'OK' })
});

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
