import express, { Request, Response } from 'express';
import axios from 'axios';

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
