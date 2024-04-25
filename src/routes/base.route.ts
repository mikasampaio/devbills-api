import { Router } from 'express';
import packageJson from '../../package.json';

export const baseRoutes = Router();

baseRoutes.get('/', (_, res) => {
  const { author, description, version } = packageJson;

  res.status(200).json({
    author,
    description,
    version,
  });
});

//* ENTITY -> SERVICE -> CONTROLLER -> ROUTE
