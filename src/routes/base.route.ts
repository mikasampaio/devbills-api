import { Router } from 'express';
import packageJson from '../../package.json';

export const baseRoutes = Router();

baseRoutes.get('/', (_, res) => {
  const { name, author, description, version } = packageJson;

  res.status(200).json({ name, author, description, version });
});

//* ENTITY -> SERVICE -> CONTROLLER -> ROUTE
