import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const EVENTS_ROUTE = '/events';

app.post(EVENTS_ROUTE, (req: Request, res: Response) => {
  const event = req.body;

  axios.post(`${process.env.POSTS_SERVICE_URL}${EVENTS_ROUTE}`, event);
  axios.post(`${process.env.COMMENTS_SERVICE_URL}${EVENTS_ROUTE}`, event);
  axios.post(`${process.env.QUERY_SERVICE_URL}${EVENTS_ROUTE}`, event);

  res.send({ status: 'OK' })
});

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
