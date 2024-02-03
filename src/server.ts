import 'dotenv/config';
import express, { json } from 'express';

import { routes } from './routes';
import { Mongo } from './database';
import { errorHandler } from './middlewares/error-handler.middleware';

Mongo().then(() => {
  const port = 3334;
  const app = express();

  app.use(json());
  app.use(routes);
  app.use(errorHandler);

  app.listen(port, () => console.log(`App is running at port ${port}`));
});
