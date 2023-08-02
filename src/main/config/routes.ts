import { Router, type Express } from 'express';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  router.get('/', (req, res) => {
    res.send({ body: 'hello, world!' });
  });
};
