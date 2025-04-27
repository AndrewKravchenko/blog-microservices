import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import path from 'node:path';
import { authRouter } from './routes';
import { NotFoundError } from '@/errors/not-found-error';
import { errorHandler } from '@/middlewares/error-handler';

const envPath = `.env.${process.env.NODE_ENV || 'development'}`;

dotenv.config({
  path: path.resolve(process.cwd(), envPath),
});


const app = express();
app.use(express.json());

app.use('/api/users', authRouter);

app.all('*', async (_req, _res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
