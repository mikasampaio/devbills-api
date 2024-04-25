import 'dotenv/config';
import express, { json } from 'express';
import { routes } from './routes';
import { mongo } from './database';
import { errorHandler } from './middlewares/error-handler.middleware';

const port = 3333;

mongo().then(() => {
  const app = express();

  app.use(json());
  app.use(routes);
  app.use(errorHandler)
  
  app.listen(port, () => console.log(`App is running at port ${port}!`));
});
