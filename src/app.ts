import { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandeler';
import notFound from './app/middlewares/notFound';
import router from './app/route';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Bro!');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
